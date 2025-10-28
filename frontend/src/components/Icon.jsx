const Icon = ({ path, className = "w-8 h-8" }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
//     <path d={path} />
//   </svg>
    <img src={path} className={className} alt="icon" />
);

export default Icon;
