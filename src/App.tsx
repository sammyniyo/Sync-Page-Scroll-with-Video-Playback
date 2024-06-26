import { useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useMemo, useRef } from "react";

function App() {
  const ref = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['center end', 'start start'],
  });

  const images = useMemo(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 1; i <= 86; i++) {
      const img = new Image();
      img.src = `/images/${i}.webp`;
      loadedImages.push(img);
    }
    return loadedImages;
  }, []);


  const render = useCallback(
    (index: number) => {
      if (images[index - 1]) {
        ref.current?.getContext('2d')?.drawImage(images[index - 1], 0, 0);
      }
    },
    [images]
  );

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    render(Number(latest.toFixed()));
  });

  return (
    <div style={{
      height: '6000px',
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ height: '2000px' }} />
      <canvas ref={ref}></canvas> 
    </div>
  );
}

export default App;
