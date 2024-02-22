
interface Props {
  src: string;
  alt: string;
}

const ProminentImage = ({ src, alt }: Props) => {
  return (
    <img
      src={src}
      alt={alt}
      width="100%"
      height="300px"
      style={{ objectFit: "cover" }}
    />
  );
};

export default ProminentImage;
