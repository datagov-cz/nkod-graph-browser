export const Test = ({ color = 'none', strokeWidth = 1 }) => {
  return (
    <polyline
      stroke={color}
  strokeLinecap="round"
  strokeLinejoin="round"
  strokeWidth={strokeWidth}
  fill={color}
  points="-50,-4 0,0 -5,4 -5,-4"
    />
);
};
