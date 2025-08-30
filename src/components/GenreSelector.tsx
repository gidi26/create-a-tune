import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GenreSelectorProps {
  selectedGenre: string;
  selectedSubgenre: string;
  onGenreChange: (genre: string) => void;
  onSubgenreChange: (subgenre: string) => void;
}

const musicGenres = {
  "pop": ["Pop Mainstream", "Electropop", "Indie Pop", "K-Pop", "Synthpop"],
  "rock": ["Classic Rock", "Alternative Rock", "Punk Rock", "Hard Rock", "Progressive Rock"],
  "hip-hop": ["Rap", "Trap", "Old School", "Boom Bap", "Cloud Rap"],
  "electronic": ["House", "Techno", "Dubstep", "Ambient", "Drum & Bass"],
  "jazz": ["Smooth Jazz", "Bebop", "Fusion", "Contemporary Jazz", "Latin Jazz"],
  "reggae": ["Roots Reggae", "Dancehall", "Dub", "Reggaeton", "Ska"],
  "country": ["Country Pop", "Bluegrass", "Outlaw Country", "Country Rock", "Folk Country"],
  "r&b": ["Contemporary R&B", "Neo Soul", "Funk", "Motown", "Gospel"],
  "latin": ["Salsa", "Bachata", "Merengue", "Reggaeton", "Bossa Nova"],
  "folk": ["Folk Rock", "Indie Folk", "Traditional Folk", "Celtic", "Americana"],
  "blues": ["Chicago Blues", "Delta Blues", "Electric Blues", "Blues Rock", "Soul Blues"],
  "classical": ["Baroque", "Romantic", "Contemporary Classical", "Minimalism", "Orchestral"]
} as const;

export const GenreSelector: React.FC<GenreSelectorProps> = ({
  selectedGenre,
  selectedSubgenre,
  onGenreChange,
  onSubgenreChange,
}) => {
  const handleGenreChange = (genre: string) => {
    onGenreChange(genre);
    onSubgenreChange(""); // Reset subgenre when genre changes
  };

  const availableSubgenres = selectedGenre ? musicGenres[selectedGenre as keyof typeof musicGenres] || [] : [];

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">
          Gênero Musical *
        </label>
        <Select value={selectedGenre} onValueChange={handleGenreChange}>
          <SelectTrigger className="bg-form-background border-form-border">
            <SelectValue placeholder="Selecione um gênero" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-form-border">
            {Object.keys(musicGenres).map((genre) => (
              <SelectItem key={genre} value={genre} className="hover:bg-muted">
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedGenre && availableSubgenres.length > 0 && (
        <div>
          <label className="text-sm font-medium mb-2 block">
            Subgênero *
          </label>
          <Select value={selectedSubgenre} onValueChange={onSubgenreChange}>
            <SelectTrigger className="bg-form-background border-form-border">
              <SelectValue placeholder="Selecione um subgênero" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-form-border">
              {availableSubgenres.map((subgenre) => (
                <SelectItem key={subgenre} value={subgenre} className="hover:bg-muted">
                  {subgenre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};