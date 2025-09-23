const gradient = {
  background: `
    linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 1) 100%),
    linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0) 80%, rgba(255, 255, 255, 1) 100%),
    linear-gradient(90deg, rgba(7, 255, 255, 1) 0%, rgba(121, 22, 243, 1) 100%)
  `,
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
} as const;

export default function HomeEcosystemGradient() {
  return (
    <div className="absolute inset-0 flex items-center justify-center -z-10">
      <div className="w-[2600px] h-3/4 flex-shrink-0" style={gradient} />
    </div>
  );
}
