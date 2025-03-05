import Preloader from "@/components/Preloader";
import SearchForm from "@/components/SearchForm";
import SearchResultPosts from "@/components/SearchResultPosts";
import { Suspense } from "react";

export default async function SearchPage({
    searchParams: { query }
}: {
    searchParams: { query: string }
}) {

    return (
        <div className="w-full">
            <SearchForm />
            {typeof query != "undefined" && (
                <Suspense fallback={<Preloader />}>
                    <SearchResultPosts query={query} />
                </Suspense>
            )}

        </div>
    )
}