import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { categoriesQuery, productsQuery } from "@/lib/queries";
import { ShopView } from "./shop";
import type { Category } from "@/lib/types";

export const Route = createFileRoute("/category/$slug")({
  loader: async ({ context, params }) => {
    const cats = await context.queryClient.ensureQueryData(categoriesQuery());
    const cat = (cats as Category[]).find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    context.queryClient.ensureQueryData(productsQuery({ categorySlug: params.slug, limit: 60 }));
    return { cat };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.cat.name} — Ateliér` },
          {
            name: "description",
            content: loaderData.cat.tagline ?? `Shop ${loaderData.cat.name} at Ateliér.`,
          },
          { property: "og:title", content: `${loaderData.cat.name} — Ateliér` },
          {
            property: "og:description",
            content: loaderData.cat.tagline ?? `Shop ${loaderData.cat.name} at Ateliér.`,
          },
          ...(loaderData.cat.image_url
            ? [{ property: "og:image", content: loaderData.cat.image_url } as const]
            : []),
        ]
      : [{ title: "Category" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl">Category not found</h1>
      <p className="mt-3 text-muted-foreground">We couldn't find that category.</p>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const { data: cats = [] } = useSuspenseQuery(categoriesQuery());
  const cat = (cats as Category[]).find((c) => c.slug === slug)!;
  return (
    <ShopView
      title={cat.name}
      subtitle={cat.tagline ?? undefined}
      filter={{ categorySlug: slug, limit: 60 }}
      lockedCategoryId={cat.id}
    />
  );
}
