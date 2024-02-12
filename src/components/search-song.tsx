import axios from "axios";
import {
  FC,
  HTMLAttributes,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserContext } from "../user-context";
import {
  StyledButton,
  StyledCard,
  StyledCardContent,
  StyledImage,
  StyledTypography,
} from "./styles/components-styles";
import AddIcon from "@mui/icons-material/Add";
import { SpotifyTrackInfo } from "../constants/spotify";
import { Autocomplete, TextField } from "@mui/material";
import { search } from "../search";

interface SearchSongProps {
  onTrackSelected: (track: SpotifyTrackInfo) => void;
}

const SearchSong: FC<SearchSongProps> = ({
  onTrackSelected: onTrackSelected,
}) => {
  const context = useContext(UserContext);
  const accessToken = context.user.spotifyAccessToken;

  const [query, setQuery] = useState("");
  console.log(query);
  const [suggestions, setSuggestions] = useState<SpotifyTrackInfo[]>([]);

  const handleSearch = async (query: string) => {
    if (!query?.trim()) {
      setSuggestions([]);
      return;
    }
    if (!accessToken) {
      return;
    }
    const results = await search(query, accessToken);

    try {
      setSuggestions(results);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  const renderOption = (
    props: HTMLAttributes<HTMLLIElement>,
    track: SpotifyTrackInfo,
  ) => (
    <StyledCard key={track.id}>
      <StyledCardContent>
        <StyledImage src={track.album.images[0].url} />
        <StyledTypography variant="subtitle1">{track.name}</StyledTypography>
        <StyledTypography variant="subtitle2">
          {track.artists[0].name}
        </StyledTypography>
        <StyledTypography variant="subtitle2">
          {track.album.name}
        </StyledTypography>
        <StyledButton onClick={() => onTrackSelected(track)}>
          <AddIcon />
          Add
        </StyledButton>
      </StyledCardContent>
    </StyledCard>
  );

  return (
    <StyledCard>
      <StyledCardContent>
        <StyledTypography variant="h6">
          Find your favorite songs
        </StyledTypography>
        <Autocomplete
          id="search-autocomplete"
          options={suggestions}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for a song"
              variant="outlined"
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
          renderOption={renderOption}
        />
      </StyledCardContent>
    </StyledCard>
  );
};

export default SearchSong;
