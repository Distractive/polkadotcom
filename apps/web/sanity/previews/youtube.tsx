import type { PreviewProps } from 'sanity';

type CastPreviewProps = PreviewProps & {
  url: string;
  title: string;
};

export const YouTubePreview = (props: PreviewProps) => {
  const { url, title } = props as CastPreviewProps;
  if (!url || url === '') {
    return <div>Missing YouTube URL</div>;
  }
  return (
    <iframe
      title={title}
      width="560"
      height="315"
      src={url}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    />
  );
};
