const gradient = {
  background: `
    linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%),
    linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%),
    linear-gradient(90deg, rgba(255, 38, 112, 0.8) 0%, rgba(121, 22, 243, 0.8) 100%)
  `,
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
} as const;

export default function FooterGradient() {
  return <div className="absolute inset-0 -z-10" style={gradient} />;
}
