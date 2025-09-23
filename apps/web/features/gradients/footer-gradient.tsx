const gradient = {
  background: `
    linear-gradient(0deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 1) 70%),
    linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 15%, rgba(255, 255, 255, 0) 85%, rgba(255, 255, 255, 1) 100%),
    linear-gradient(90deg, rgba(255, 38, 112, 0.8) 0%, rgba(121, 22, 243, 0.8) 100%)
  `,
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
} as const;

export default function FooterGradient() {
  return (
    <div className="absolute inset-0 flex items-center justify-center -z-10 overflow-hidden">
      <div className="w-[2600px] h-full flex-shrink-0" style={gradient} />
    </div>
  );
}
