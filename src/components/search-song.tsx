import { FC, HTMLAttributes, useContext, useEffect, useState } from "react";
import { UserContext } from "../user-context";
import {
  StyledCardContent,
  StyledImage,
  StyledTypography,
} from "./styles/components-styles";
import { SpotifyTrackInfo } from "../constants/spotify";
import {
  Autocomplete,
  ClickAwayListener,
  Paper,
  TextField,
} from "@mui/material";
import { search } from "../search";

interface SearchSongProps {
  onTrackSelected: (track: SpotifyTrackInfo) => void;
  onSearch: (serach: boolean) => void;
}

const SearchSong: FC<SearchSongProps> = ({ onTrackSelected, onSearch }) => {
  const context = useContext(UserContext);
  const accessToken = context.user.spotifyAccessToken;

  const [query, setQuery] = useState("");
  console.log(query);
  const [suggestions, setSuggestions] = useState<SpotifyTrackInfo[]>([]);

  const handleSearch = async (query: string) => {
    if (!query?.trim()) {
      setSuggestions([]);
      onSearch(false);
      return;
    }
    onSearch(true);

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
    _props: HTMLAttributes<HTMLLIElement>,
    track: SpotifyTrackInfo,
  ) => (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "300px",
        cursor: "pointer",
      }}
      onClick={() => onTrackSelected(track)} // Attach onClick event handler
    >
      <StyledImage src={track.album.images[0].url} />
      <StyledTypography variant="subtitle1">{track.name}</StyledTypography>
      <StyledTypography variant="subtitle2">
        {track.artists[0].name}
      </StyledTypography>
      <StyledTypography variant="subtitle2">
        {track.album.name}
      </StyledTypography>
    </Paper>
  );
  const handleClickAaway = () => onSearch(false);

  return (
    <StyledCardContent>
      <StyledTypography variant="h6">Find your favorite songs</StyledTypography>
      <ClickAwayListener onClickAway={handleClickAaway}>
        <Autocomplete
          id="search-autocomplete"
          options={suggestions}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for a song"
              style={{ width: 400 }}
              onChange={(e) => setQuery(e.target.value)}
              sx={{
                "& .MuiAutocomplete-inputRoot": { backgroundColor: "white" },
              }}
            />
          )}
          renderOption={renderOption}
        />
      </ClickAwayListener>
    </StyledCardContent>
  );
};

export default SearchSong;
