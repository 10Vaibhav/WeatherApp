import { useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Button } from "./ui/button";
import { Loader2, Search } from "lucide-react";
import { useLocationSearch } from "@/hooks/use-weather";
import { CommandSeparator } from "cmdk";
import { useNavigate } from "react-router-dom";

const CitySearch = () => {

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const {data: locations, isLoading} = useLocationSearch(query);

  console.log(locations);

  const handleSelect = (cityData: string) => {

    const [lat, lon, name, country] = cityData.split("|");

    navigate(`/city/${name}??lat=${lat}&lon=${lon}`);
  }

  return (
    <>

    <Button
    variant={"outline"}
    className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12  md:w-40 lg:w-64"
    onClick={()=> setOpen(true)}
    >
      <Search className="mr-2 h-4 w-4"/>
      Search cities...
    </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search Cities..." value={query}onValueChange={setQuery}/>
        <CommandList>
        {query.length > 2 && !isLoading && <CommandEmpty>No City found.</CommandEmpty>}
          <CommandGroup heading="Favorites">
            <CommandItem>Nagpur</CommandItem>
          </CommandGroup>

          <CommandSeparator/>

          <CommandGroup heading="Recent Searches">
            <CommandItem>Nagpur</CommandItem>
          </CommandGroup>

          <CommandSeparator/>

          {
            locations && locations.length > 0 && (
            <CommandGroup heading="suggestions">
              {
                isLoading && (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-4 w-4 animate-spin"/>
                  </div>
                )
              }

              {
                locations.map((location) => {
                  return (<CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                    >
                    <Search className="mr-2 h-4 w-4"/>
                    <span>{location.name}</span>
                    {location.state && (
                      <span className="text-sm text-muted-foreground">
                        , {location.country}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      , {location.country}
                    </span>
                  </CommandItem>)
                })
              }
            </CommandGroup>
            )
          }
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
