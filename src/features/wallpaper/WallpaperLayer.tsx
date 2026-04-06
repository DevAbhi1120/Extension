import type { Settings } from '../../types';

export function WallpaperLayer({ settings }: { settings: Settings }) {
  const style = {
    backgroundImage: `url(${settings.wallpaper ?? 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97'})`,
    filter: `blur(${settings.wallpaperBlur}px) brightness(${settings.wallpaperBrightness})`
  };

  return (
    <>
      <div className="absolute inset-0 -z-20 bg-cover bg-center transition-all duration-500" style={style} />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(120deg, ${settings.gradient[0]}80, ${settings.gradient[1]}80)`,
          opacity: settings.overlayOpacity
        }}
      />
    </>
  );
}
