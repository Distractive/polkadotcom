interface Props {
  children: React.ReactNode
}
export const HighlightDecorator = (props: Props) => (
  <span style={{ color: "#E6007A" }}>{props.children}</span>
)
