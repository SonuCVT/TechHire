import React from "react";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    zIndex: 1000
  },
  shimmerCard: {
    display: "flex",
    padding: "16px",
    width: "200px",
    borderRadius: "4px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, .1)"
  },
  circle: {
    height: "56px",
    width: "56px",
    borderRadius: "50%",
    background: "linear-gradient(90deg, #F0F0F0 25%, #E0E0E0 50%, #F0F0F0 75%)",
    backgroundSize: "200% 100%",
    animation: "$shimmer 1.5s infinite"
  },
  line: {
    width: "96px",
    height: "8px",
    marginLeft: "16px",
    alignSelf: "center",
    borderRadius: "8px",
    background: "linear-gradient(90deg, #F0F0F0 25%, #E0E0E0 50%, #F0F0F0 75%)",
    backgroundSize: "200% 100%",
    animation: "$shimmer 1.5s infinite"
  },
  "@keyframes shimmer": {
    "0%": { backgroundPosition: "200% 0" },
    "100%": { backgroundPosition: "-200% 0" }
  }
});
const ShimmerLoader = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.shimmerCard}>
        <div className={classes.circle} />
        <div className={classes.line} />
      </div>
    </div>
  );
};
export default ShimmerLoader;