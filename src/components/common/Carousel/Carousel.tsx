import React, { useState } from 'react';
import { Box } from '@mui/material';

interface CarouselProps {
  children: React.ReactNode[];
}

const Carousel = ({ children }:CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStart !== null) {
      const offset = e.touches[0].clientX - dragStart;
      setDragOffset(offset);
    }
  };

  const handleTouchEnd = () => {
    if (dragStart !== null) {
      if (dragOffset > 50 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      } else if (dragOffset < -50 && activeIndex < children.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    }
    setDragStart(null);
    setDragOffset(0);
  };

  // Mouse events for desktop dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart !== null) {
      const offset = e.clientX - dragStart;
      setDragOffset(offset);
    }
  };

  const handleMouseUp = () => {
    if (dragStart !== null) {
      if (dragOffset > 50 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      } else if (dragOffset < -50 && activeIndex < children.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    }
    setDragStart(null);
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (dragStart !== null) {
      if (dragOffset > 50 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      } else if (dragOffset < -50 && activeIndex < children.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    }
    setDragStart(null);
    setDragOffset(0);
  };

  // Calculate the transform style for sliding effect
  const transformStyle = {
    transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`,
    transition: dragStart === null ? 'transform 0.3s ease' : 'none',
    display: 'flex',
  };

  return (
    <>
      {/* Carousel viewport with padding and centered content */}
      <Box
        sx={{
          overflow: 'hidden',
          width: '100%',
          padding: '10px',
          paddingBottom:'20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Slides container */}
        <Box sx={transformStyle}>
  {children.map((child, index) => (
    <Box
      key={index}
      sx={{
        flex: '0 0 100%',
        width: '100%', // Ensure the slide fills the parent's width
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {child}
    </Box>
  ))}
</Box>
</Box>
      {/* Navigation dots container (centered and with width as long as its dots) */}
      <Box sx={{ textAlign: 'center', mt: 2, }}>
        <Box sx={{ display: 'inline-flex', backgroundColor:"grey.200", p:1, borderRadius:50 }}>
          {children.map((_, index) => (
            <Box
              key={index}
              onClick={() => setActiveIndex(index)}
              sx={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: index === activeIndex ? 'black' : 'gray',
                margin: '0 4px',
                cursor: 'pointer',
              }}
            />
          ))}
        </Box>
      </Box>
  </>
  );
};

export default Carousel;
