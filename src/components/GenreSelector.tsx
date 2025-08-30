import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GenreSelectorProps {
  selectedGenre: string;
  selectedSubgenre: string;
  onGenreChange: (genre: string) => void;
  onSubgenreChange: (subgenre: string) => void;
}

const musicGenres = {
  "sertanejo": ["Raiz", "Universitário", "Romântico", "Feminejo", "Pisadinha", "Gospel"],
  "pop": ["Mainstream", "Electropop", "Pop Rock", "Indie Pop", "Teen Pop", "Synth Pop"],
  "rock": ["Clássico", "Alternativo", "Hard Rock", "Indie Rock", "Progressivo", "Punk"],
  "r&b": ["Contemporâneo", "Neo Soul", "Trap Soul", "Soul Clássico", "Quiet Storm", "Alternative"],
  "samba-pagode": ["Pagode", "Samba Enredo", "Samba Rock", "Bossa Nova", "Samba Jazz", "Samba Reggae"],
  "gospel": ["Contemporâneo", "Tradicional", "Urban", "Southern", "Praise & Worship", "Black Gospel"],
  "funk": ["Brasileiro", "Melody", "Consciente", "Proibidão", "Gospel", "Pop"],
  "rap": ["Nacional", "Trap Rap", "Gospel", "Boom Bap", "Gangsta", "Melódico"],
  "trap": ["Brasileiro", "Melódico", "Drill", "Gospel", "Funk", "Jazz"],
  "country": ["Americano", "Rock", "Bluegrass", "Pop", "Outlaw", "Folk"],
  "forro": ["Pé-de-Serra", "Universitário", "Eletrônico", "Xote", "Baião", "Estilizado"]
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
            {Object.keys(musicGenres).map((genre) => {
              const displayNames: Record<string, string> = {
                "sertanejo": "Sertanejo",
                "pop": "Pop",
                "rock": "Rock",
                "r&b": "R&B", 
                "samba-pagode": "Samba/Pagode",
                "gospel": "Gospel",
                "funk": "Funk",
                "rap": "Rap",
                "trap": "Trap",
                "country": "Country",
                "forro": "Forró"
              };
              return (
                <SelectItem key={genre} value={genre} className="hover:bg-muted">
                  {displayNames[genre] || genre.charAt(0).toUpperCase() + genre.slice(1)}
                </SelectItem>
              );
            })}
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