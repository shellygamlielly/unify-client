import axios from "axios";
import {
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
import { useParams } from "react-router-dom";
import { SpotifyTrackInfo, SpotifyUserProfile } from "../constants/spotify";
import { Autocomplete, TextField } from "@mui/material";
import { search } from "../search";
import { ArtTrackSharp } from "@mui/icons-material";

function SearchSong() {
  const { playlistId } = useParams();

  const context = useContext(UserContext);
  const accessToken = context.user.spotifyAccessToken;

  const [query, setQuery] = useState("");
  console.log(query);
  const [suggestions, setSuggestions] = useState<SpotifyTrackInfo[]>([]);
  const [selectedTrack, setSelectedTrack] = useState();

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

  const handleSelectTrack = async (track: SpotifyTrackInfo) => {
    if (!track) {
      return;
    }
    const response = await axios.post(
      `${import.meta.env.VITE_TUNITY_SERVER_BASE_URL}/song/`,
      {
        spotifySongId: track.id,
        name: track.name,
        playlistId,
        albumCoverUrl: track.album.images[0].url,
      },
    );
    setSelectedTrack(response.data);
  };

  const renderOption = (
    props: HTMLAttributes<HTMLLIElement>,
    track: SpotifyTrackInfo,
  ) => (
    <StyledCard key={track.name}>
      <StyledCardContent>
        <StyledImage src={track.album.images[0].url} />
        <StyledTypography variant="subtitle1">{track.name}</StyledTypography>
        <StyledTypography variant="subtitle2">
          {track.artists[0].name}
        </StyledTypography>
        <StyledTypography variant="subtitle2">
          {track.album.name}
        </StyledTypography>
        <StyledButton onClick={() => handleSelectTrack(track)}>
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
}

export default SearchSong;
