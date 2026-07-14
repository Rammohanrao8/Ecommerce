
-- Roles enum + user_roles (needed later, safe to add now)
CREATE TYPE public.app_role AS ENUM ('admin', 'seller', 'customer');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles viewable by owner" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Profiles updatable by owner" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Profiles insertable by owner" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Auto create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url')
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'customer') ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Categories
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  tagline TEXT,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories public read" ON public.categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Categories admin write" ON public.categories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  compare_at_price NUMERIC(10,2),
  rating NUMERIC(2,1) NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count INT NOT NULL DEFAULT 0,
  stock INT NOT NULL DEFAULT 0,
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  sizes TEXT[] NOT NULL DEFAULT '{}',
  colors TEXT[] NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_new BOOLEAN NOT NULL DEFAULT false,
  is_flash_sale BOOLEAN NOT NULL DEFAULT false,
  is_best_seller BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX products_category_idx ON public.products(category_id);
CREATE INDEX products_flash_idx ON public.products(is_flash_sale) WHERE is_flash_sale;
CREATE INDEX products_featured_idx ON public.products(is_featured) WHERE is_featured;
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products public read" ON public.products FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Products admin write" ON public.products FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Seed categories
INSERT INTO public.categories (slug, name, tagline, image_url, sort_order) VALUES
('sneakers', 'Sneakers', 'Kicks that move you', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', 1),
('audio', 'Audio', 'Sound reimagined', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 2),
('watches', 'Watches', 'Time, refined', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', 3),
('bags', 'Bags', 'Carry with intent', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80', 4),
('cameras', 'Cameras', 'Capture the moment', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80', 5),
('apparel', 'Apparel', 'Everyday essentials', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80', 6);

-- Seed products
WITH c AS (SELECT id, slug FROM public.categories)
INSERT INTO public.products (slug, name, brand, description, category_id, price, compare_at_price, rating, review_count, stock, images, sizes, colors, tags, is_featured, is_new, is_flash_sale, is_best_seller) VALUES
-- Sneakers
('air-runner-pulse', 'Air Runner Pulse', 'Nike', 'Featherlight cushioning and responsive foam for effortless daily miles.', (SELECT id FROM c WHERE slug='sneakers'), 149.00, 189.00, 4.7, 1284, 42, '["https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1200&q=80","https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&q=80","https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1200&q=80"]', ARRAY['7','8','9','10','11','12'], ARRAY['Black','White','Ice'], ARRAY['running','lightweight'], true, true, true, true),
('velocity-pro', 'Velocity Pro', 'Adidas', 'Race-day speed engineered with carbon plate propulsion.', (SELECT id FROM c WHERE slug='sneakers'), 219.00, 260.00, 4.6, 842, 28, '["https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1200&q=80","https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=1200&q=80"]', ARRAY['8','9','10','11'], ARRAY['Orange','Black'], ARRAY['running','pro'], true, false, false, true),
('court-classic', 'Court Classic', 'New Balance', 'Timeless silhouette rebuilt with premium leather uppers.', (SELECT id FROM c WHERE slug='sneakers'), 129.00, NULL, 4.5, 356, 61, '["https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=1200&q=80","https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=1200&q=80"]', ARRAY['7','8','9','10','11'], ARRAY['White','Cream'], ARRAY['lifestyle','classic'], false, true, false, false),
('trail-scout', 'Trail Scout GTX', 'Salomon', 'Grippy Vibram outsole meets waterproof engineered mesh.', (SELECT id FROM c WHERE slug='sneakers'), 179.00, 210.00, 4.8, 512, 33, '["https://images.unsplash.com/photo-1520256862855-398228c41684?w=1200&q=80"]', ARRAY['8','9','10','11','12'], ARRAY['Olive','Charcoal'], ARRAY['outdoor','waterproof'], true, false, true, false),
('street-lite', 'Street Lite', 'Puma', 'Slip-on comfort with knit uppers and molded footbed.', (SELECT id FROM c WHERE slug='sneakers'), 79.00, 99.00, 4.3, 219, 88, '["https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1200&q=80"]', ARRAY['7','8','9','10'], ARRAY['Grey','Navy'], ARRAY['lifestyle'], false, false, false, false),
('retro-98', 'Retro 98', 'Nike', 'A love letter to late-90s style with modern cushioning.', (SELECT id FROM c WHERE slug='sneakers'), 139.00, NULL, 4.4, 640, 40, '["https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=1200&q=80"]', ARRAY['8','9','10','11'], ARRAY['Red','White'], ARRAY['retro'], false, true, false, true),

-- Audio
('sonic-pro-max', 'Sonic Pro Max', 'Sony', 'Industry-leading noise cancellation with 30-hour battery.', (SELECT id FROM c WHERE slug='audio'), 349.00, 399.00, 4.9, 3210, 55, '["https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&q=80","https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&q=80"]', ARRAY[]::text[], ARRAY['Black','Silver','Blue'], ARRAY['wireless','noise-cancel'], true, false, true, true),
('bud-air-2', 'Bud Air 2', 'Apple', 'Spatial audio and adaptive transparency in a tiny shell.', (SELECT id FROM c WHERE slug='audio'), 249.00, NULL, 4.7, 2104, 120, '["https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=1200&q=80"]', ARRAY[]::text[], ARRAY['White'], ARRAY['earbuds'], true, true, false, true),
('studio-x1', 'Studio X1', 'Bose', 'Reference-grade sound for creators and audiophiles.', (SELECT id FROM c WHERE slug='audio'), 429.00, 499.00, 4.8, 984, 22, '["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1200&q=80"]', ARRAY[]::text[], ARRAY['Black'], ARRAY['studio'], false, false, true, false),
('boom-mini', 'Boom Mini', 'JBL', 'Portable Bluetooth speaker with IP67 waterproofing.', (SELECT id FROM c WHERE slug='audio'), 89.00, 129.00, 4.5, 1520, 200, '["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1200&q=80"]', ARRAY[]::text[], ARRAY['Red','Black','Teal'], ARRAY['speaker','waterproof'], false, false, true, true),
('turntable-vinyl', 'Vinyl 300', 'Audio-Technica', 'Belt-driven turntable with built-in phono preamp.', (SELECT id FROM c WHERE slug='audio'), 299.00, NULL, 4.6, 412, 18, '["https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1200&q=80"]', ARRAY[]::text[], ARRAY['Silver'], ARRAY['vinyl'], false, true, false, false),

-- Watches
('chrono-alpha', 'Chrono Alpha', 'Seiko', 'Sapphire crystal chronograph with automatic movement.', (SELECT id FROM c WHERE slug='watches'), 599.00, 749.00, 4.7, 421, 15, '["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200&q=80","https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=1200&q=80"]', ARRAY[]::text[], ARRAY['Silver','Gold'], ARRAY['luxury'], true, false, false, true),
('smart-fit-8', 'SmartFit 8', 'Garmin', 'GPS running watch with 14-day battery life.', (SELECT id FROM c WHERE slug='watches'), 329.00, 399.00, 4.6, 810, 44, '["https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=1200&q=80"]', ARRAY[]::text[], ARRAY['Black','Slate'], ARRAY['fitness'], false, true, true, false),
('minimalist-38', 'Minimalist 38', 'Braun', 'Bauhaus-inspired dial with a quiet quartz movement.', (SELECT id FROM c WHERE slug='watches'), 179.00, NULL, 4.4, 220, 60, '["https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1200&q=80"]', ARRAY[]::text[], ARRAY['Black','White'], ARRAY['minimalist'], true, false, false, false),
('diver-300', 'Diver 300M', 'Citizen', 'Eco-drive light-powered dive watch rated to 300m.', (SELECT id FROM c WHERE slug='watches'), 449.00, NULL, 4.8, 356, 22, '["https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1200&q=80"]', ARRAY[]::text[], ARRAY['Blue','Black'], ARRAY['dive'], false, true, false, true),

-- Bags
('everyday-tote', 'Everyday Tote', 'Bellroy', 'Weatherproof recycled canvas with a padded 15" laptop sleeve.', (SELECT id FROM c WHERE slug='bags'), 149.00, NULL, 4.7, 512, 80, '["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80","https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200&q=80"]', ARRAY[]::text[], ARRAY['Slate','Charcoal','Sand'], ARRAY['tote','laptop'], true, false, false, true),
('commuter-pack', 'Commuter Pack 22L', 'Peak Design', 'Expandable roll-top with side-access laptop compartment.', (SELECT id FROM c WHERE slug='bags'), 229.00, 279.00, 4.8, 1240, 33, '["https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=1200&q=80"]', ARRAY[]::text[], ARRAY['Black','Sage'], ARRAY['backpack'], true, true, true, true),
('weekender', 'Weekender Duffle', 'Away', 'Water-resistant nylon duffle sized for a two-day trip.', (SELECT id FROM c WHERE slug='bags'), 195.00, NULL, 4.5, 289, 50, '["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80"]', ARRAY[]::text[], ARRAY['Navy','Black'], ARRAY['travel'], false, false, false, false),
('sling-mini', 'Sling Mini', 'Aer', 'Sleek EDC sling for phone, wallet, keys and cables.', (SELECT id FROM c WHERE slug='bags'), 79.00, 99.00, 4.4, 178, 120, '["https://images.unsplash.com/photo-1611010344445-5f57ab6c8b0e?w=1200&q=80"]', ARRAY[]::text[], ARRAY['Black'], ARRAY['edc'], false, true, false, false),

-- Cameras
('mirrorless-r7', 'Mirrorless R7', 'Canon', '32.5MP APS-C sensor with 15fps burst and 4K60 video.', (SELECT id FROM c WHERE slug='cameras'), 1499.00, 1699.00, 4.8, 612, 12, '["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=80","https://images.unsplash.com/photo-1519183071298-a2962feb14f4?w=1200&q=80"]', ARRAY[]::text[], ARRAY['Black'], ARRAY['mirrorless'], true, false, true, true),
('travel-fixed-40', 'Travel Fixed 40', 'Fujifilm', 'Pocketable APS-C with a sharp 40mm-equivalent lens.', (SELECT id FROM c WHERE slug='cameras'), 999.00, NULL, 4.7, 401, 20, '["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&q=80"]', ARRAY[]::text[], ARRAY['Silver','Black'], ARRAY['compact'], true, true, false, false),
('action-8k', 'Action 8K', 'GoPro', 'Rugged action cam with HyperSmooth stabilization.', (SELECT id FROM c WHERE slug='cameras'), 449.00, 499.00, 4.6, 890, 65, '["https://images.unsplash.com/photo-1500634245200-e5245c7574ef?w=1200&q=80"]', ARRAY[]::text[], ARRAY['Black'], ARRAY['action'], false, false, true, true),
('drone-pro', 'Drone Pro 4', 'DJI', 'Foldable 4K drone with 46-minute flight time.', (SELECT id FROM c WHERE slug='cameras'), 1099.00, 1249.00, 4.7, 320, 18, '["https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&q=80"]', ARRAY[]::text[], ARRAY['Grey'], ARRAY['drone'], false, true, false, false),

-- Apparel
('merino-crew', 'Merino Crew Tee', 'Icebreaker', 'Ultralight 150gsm merino wool. Odor-resistant, temperature-regulating.', (SELECT id FROM c WHERE slug='apparel'), 89.00, NULL, 4.6, 421, 200, '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80","https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200&q=80"]', ARRAY['XS','S','M','L','XL','XXL'], ARRAY['Black','Heather','Olive'], ARRAY['essential','merino'], true, false, false, true),
('shell-jacket', 'Storm Shell', 'Arc''teryx', '3-layer Gore-Tex Pro shell for alpine conditions.', (SELECT id FROM c WHERE slug='apparel'), 599.00, 699.00, 4.9, 512, 24, '["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80"]', ARRAY['S','M','L','XL'], ARRAY['Black','Orange'], ARRAY['outdoor','shell'], true, true, true, true),
('everyday-jeans', 'Everyday Jeans', 'Uniqlo', 'Selvedge denim with a modern tapered leg.', (SELECT id FROM c WHERE slug='apparel'), 69.00, NULL, 4.4, 780, 150, '["https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80"]', ARRAY['28','30','32','34','36'], ARRAY['Indigo','Black'], ARRAY['denim'], false, false, false, false),
('hoodie-soft', 'Soft Hoodie', 'Champion', 'Heavyweight fleece with a brushed inner lining.', (SELECT id FROM c WHERE slug='apparel'), 79.00, 99.00, 4.5, 302, 180, '["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&q=80"]', ARRAY['S','M','L','XL'], ARRAY['Grey','Black','Cream'], ARRAY['loungewear'], false, false, true, true),
('performance-short', 'Performance Short 7"', 'Lululemon', 'Four-way stretch with a hidden zip pocket.', (SELECT id FROM c WHERE slug='apparel'), 78.00, NULL, 4.6, 512, 90, '["https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=1200&q=80"]', ARRAY['S','M','L','XL'], ARRAY['Black','Navy','Sage'], ARRAY['training'], false, true, false, false);
