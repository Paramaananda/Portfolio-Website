import { NotFoundView } from "@/components/not-found-view";

/** Shown when a page calls notFound(), e.g. an unknown project slug. Renders inside the site layout. */
export default function NotFound() {
  return <NotFoundView />;
}
