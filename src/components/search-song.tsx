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
  Button,
  ClickAwayListener,
  Paper,
  TextField,
} from "@mui/material";
import { search } from "../search";
import AddIcon from "@mui/icons-material/Add";

interface SearchSongProps {
  addTrack: (track: SpotifyTrackInfo) => Promise<boolean>;
  onSearch: (serach: boolean) => void;
}

const SearchSong: FC<SearchSongProps> = ({ addTrack, onSearch }) => {
  const context = useContext(UserContext);
  const accessToken = context.user.spotifyAccessToken;

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SpotifyTrackInfo[]>([]);
  const [songSelected, setSongSelected] = useState<SpotifyTrackInfo | null>(
    null,
  );

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

  useEffect(() => {
    const addSongToPlaylist = async () => {
      if (songSelected) {
        if (await addTrack(songSelected)) {
          // Filter out the selected track from suggestions
          setSuggestions((prevSuggestions) =>
            prevSuggestions.filter(
              (suggestion) => suggestion.id !== songSelected.id,
            ),
          );
        }
      }
    };

    addSongToPlaylist();
  }, [songSelected]);

  const handleClickAway = () => {
    if (songSelected) {
      onSearch(true);
    } else {
      onSearch(false);
    }
    setSongSelected(null); // Reset songSelected state
  };
  const renderOption = (
    _props: HTMLAttributes<HTMLLIElement>,
    track: SpotifyTrackInfo,
  ) => (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <StyledImage
        src={track.album.images[0].url}
        style={{ maxWidth: "60px", marginRight: "10px" }}
      />
      <div style={{ flex: 1 }}>
        <StyledTypography variant="subtitle1">{track.name}</StyledTypography>
        <StyledTypography variant="subtitle2">
          {track.artists[0].name}
        </StyledTypography>
        <StyledTypography variant="subtitle2">
          {track.album.name}
        </StyledTypography>
      </div>
      <Button
        onClick={() => {
          setSongSelected(track);
        }}
        variant="contained"
        color="primary"
      >
        <AddIcon />
      </Button>
    </Paper>
  );

  return (
    <div>
      <StyledTypography variant="h6">Find your favorite songs</StyledTypography>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Autocomplete
          id="search-autocomplete"
          options={suggestions}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for a song"
              onChange={(e) => setQuery(e.target.value)}
              sx={{
                "& .MuiAutocomplete-inputRoot": { backgroundColor: "white" },
                width: 400,
              }}
            />
          )}
          renderOption={renderOption}
        />
      </ClickAwayListener>
    </div>
  );
};

export default SearchSong;
