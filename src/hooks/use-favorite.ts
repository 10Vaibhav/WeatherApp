import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

interface FavoriteCity {
    id: string;
    lat: number;
    lon: number;
    name: string;
    country: string;
    state?: string;
    addedAt: number;
}

export function useFavorite() {
    const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>(
        "favorites",
        []
    );
    const queryClient = useQueryClient();

    const favoriteQuery = useQuery({
        queryKey: ["favorites"],
        queryFn: () => favorites,
        initialData: favorites,
        staleTime: Infinity,
    });

    const addFavorite = useMutation({
        mutationFn: async (
            city: Omit<FavoriteCity, "id" | "addedAt">
        ) => {
            const newFavorite: FavoriteCity = {
                ...city,
                id: `${city.lat}-${city.lon}`,
                addedAt: Date.now(),
            };

            const exist = favorites.some((fav) => fav.id === newFavorite.id);

            if (exist) {
                return favorites
            }
            const newFavorites = [newFavorite, ...favorites].slice(0, 10);

            setFavorites(newFavorites);
            return newFavorites;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favorites"]
            });
        },
    });

    const removeFavorite = useMutation({
        mutationFn: async (cityId: string) => {
            const newFavorites = favorites.filter((city) => city.id !== cityId);
            setFavorites(newFavorites);
            return newFavorites;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favorites"]
            });
        },
    });

    return {
        favorites: favoriteQuery.data ?? [],
        addFavorite,
        removeFavorite,
        isFavorite: (lat: number, lon: number) => favorites.some((city) => city.lat === lat && city.lon === lon)
    };
}
