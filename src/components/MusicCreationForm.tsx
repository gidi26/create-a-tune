import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AudioUpload } from "./AudioUpload";
import { AudioRecorder } from "./AudioRecorder";
import { GenreSelector } from "./GenreSelector";
import { Separator } from "@/components/ui/separator";
import { Music, Wand2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  audioFile: File | null;
  recordedAudio: Blob | null;
  lyrics: string;
  exclusions: string;
  genre: string;
  subgenre: string;
}

export const MusicCreationForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    audioFile: null,
    recordedAudio: null,
    lyrics: "",
    exclusions: "",
    genre: "",
    subgenre: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.genre) {
      toast({
        title: "Erro de validação",
        description: "Por favor, selecione um gênero musical.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.subgenre) {
      toast({
        title: "Erro de validação",
        description: "Por favor, selecione um subgênero.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.lyrics.trim()) {
      toast({
        title: "Erro de validação",
        description: "Por favor, insira a letra da música.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      
      // Add text fields
      submitData.append("lyrics", formData.lyrics);
      submitData.append("exclusions", formData.exclusions);
      submitData.append("genre", formData.genre);
      submitData.append("subgenre", formData.subgenre);
      
      // Add audio files
      if (formData.audioFile) {
        submitData.append("audioFile", formData.audioFile);
      }
      
      if (formData.recordedAudio) {
        submitData.append("recordedAudio", formData.recordedAudio, "recording.wav");
      }

      // Here you would normally send to your server
      // const response = await fetch("/api/create-music", {
      //   method: "POST",
      //   body: submitData,
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Sucesso!",
        description: "Sua solicitação de criação musical foi enviada com sucesso.",
      });

      // Reset form
      setFormData({
        audioFile: null,
        recordedAudio: null,
        lyrics: "",
        exclusions: "",
        genre: "",
        subgenre: "",
      });

    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar sua solicitação. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Music className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">IA Musical Avançada</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 gradient-hero bg-clip-text text-transparent">
            Crie Sua Música com Inteligência Artificial
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transforme suas ideias em músicas profissionais usando nossa tecnologia de IA de última geração.
            Faça upload de áudio, grave sua melodia ou simplesmente descreva sua visão musical.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-form-border">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <Wand2 className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Formulário de Criação Musical</h2>
            </div>

            {/* Audio Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">1. Áudio Base (Opcional)</h3>
              <p className="text-sm text-muted-foreground">
                Faça upload de um arquivo de áudio existente para usar como base para sua música.
              </p>
              <AudioUpload
                onFileChange={(file) => setFormData({ ...formData, audioFile: file })}
              />
            </div>

            <Separator className="bg-form-border" />

            {/* Audio Recording Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">2. Gravação de Áudio (Opcional)</h3>
              <p className="text-sm text-muted-foreground">
                Grave um áudio diretamente do seu navegador para capturar melodias ou ideias musicais.
              </p>
              <AudioRecorder
                onAudioChange={(audioBlob) => setFormData({ ...formData, recordedAudio: audioBlob })}
              />
            </div>

            <Separator className="bg-form-border" />

            {/* Lyrics Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">3. Letra da Música *</h3>
              <p className="text-sm text-muted-foreground">
                Escreva a letra completa da sua música. Seja criativo e expressivo!
              </p>
              <Textarea
                placeholder="Digite a letra da sua música aqui...&#10;&#10;Exemplo:&#10;Verso 1:&#10;Caminhando pela estrada da vida&#10;Sonhando com um mundo melhor&#10;&#10;Refrão:&#10;Vamos juntos construir&#10;Um futuro de amor e paz..."
                value={formData.lyrics}
                onChange={(e) => setFormData({ ...formData, lyrics: e.target.value })}
                className="min-h-[200px] bg-form-background border-form-border resize-none"
                required
              />
            </div>

            <Separator className="bg-form-border" />

            {/* Exclusions Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">4. Elementos a Excluir (Opcional)</h3>
              <p className="text-sm text-muted-foreground">
                Descreva elementos musicais, instrumentos ou estilos que você NÃO quer na sua música.
              </p>
              <Textarea
                placeholder="Digite o que você quer excluir da música...&#10;&#10;Exemplo:&#10;- Não quero instrumentos de sopro&#10;- Evitar ritmo muito acelerado&#10;- Sem vocais secundários&#10;- Não usar sintetizadores muito eletrônicos"
                value={formData.exclusions}
                onChange={(e) => setFormData({ ...formData, exclusions: e.target.value })}
                className="min-h-[120px] bg-form-background border-form-border resize-none"
              />
            </div>

            <Separator className="bg-form-border" />

            {/* Genre Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">5. Gênero Musical *</h3>
              <p className="text-sm text-muted-foreground">
                Selecione o gênero principal e o subgênero específico para sua música.
              </p>
              <GenreSelector
                selectedGenre={formData.genre}
                selectedSubgenre={formData.subgenre}
                onGenreChange={(genre) => setFormData({ ...formData, genre })}
                onSubgenreChange={(subgenre) => setFormData({ ...formData, subgenre })}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 gradient-primary text-primary-foreground font-semibold text-lg hover:opacity-90 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Processando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Criar Minha Música
                  </div>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};