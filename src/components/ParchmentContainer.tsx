import React from "react";

const ParchmentContainer = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const childRef = React.useRef<HTMLDivElement>(null);
  const [parchmentHeight, setParchmentHeight] = React.useState<number>(5000);

  const updateParchmentSize = () => {
    if (childRef.current === null) return;
    setParchmentHeight(childRef.current.getBoundingClientRect().height + 100);
  };

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateParchmentSize();
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      updateParchmentSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="relative flex flex-col w-3/4 h-auto mx-auto p-16">
        <div id="parchment" style={{ height: `${parchmentHeight}px` }}></div>
        <div ref={childRef}>{children}</div>
      </div>

      <svg>
        <filter id="wavy2">
          <feTurbulence
            x="0"
            y="0"
            baseFrequency="0.02"
            numOctaves="5"
            seed="1"
          ></feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="20"></feDisplacementMap>
        </filter>
      </svg>
    </>
  );
};

export default ParchmentContainer;
