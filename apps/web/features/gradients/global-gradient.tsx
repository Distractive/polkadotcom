const backgroundGradient = {
  background: `
    linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0%) 50%, #FFFFFF 100%),
    linear-gradient(180deg, rgba(255, 255, 255, 0%) 0%, #FFFFFF 100%),
    linear-gradient(107.152deg, #7916F3 0%, #07FFFF 100%)
  `,
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
} as const;

export default async function GlobalGradient() {
  return (
    // biome-ignore lint/style/useSelfClosingElements: <Not possible>
    <div
      className="absolute left-1/2 top-0 -z-50 min-h-[30rem] min-w-[90rem] -translate-x-1/2 "
      style={backgroundGradient}
    ></div>
  );
}
