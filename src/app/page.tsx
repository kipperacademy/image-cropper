import ImageCropper from "@/components/ImageCropper";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-10">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Image Cropper</h1>
        <p className="text-sm text-zinc-500">
          Arraste uma imagem, ajuste o seletor e baixe o corte em 1:1.
        </p>
      </header>
      <ImageCropper />
    </main>
  );
}
