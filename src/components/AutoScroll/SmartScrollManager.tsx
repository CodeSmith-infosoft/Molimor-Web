import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

interface ScrollPosition {
  x: number;
  y: number;
}

interface ScrollPositions {
  [key: string]: ScrollPosition;
}

const SmartScrollManager: React.FC = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const scrollPositions = useRef<ScrollPositions>({});
  const isRestoring = useRef(false);
  const previousPath = useRef<string>(location.pathname);

  // Debug logging
  useEffect(() => {
    // console.log('🔍 SmartScrollManager Debug:');
    // console.log('  Current Path:', location.pathname);
    // console.log('  Previous Path:', previousPath.current);
    // console.log('  Navigation Type:', navigationType);
    // console.log('  Location State:', location.state);
    // console.log('  History Length:', window.history.length);
    // console.log('  Saved Positions:', Object.keys(scrollPositions.current));
    // console.log('  Current Saved Position:', scrollPositions.current[location.pathname]);
    // console.log('  Current Saved Position:', window.innerHeight);
    // console.log('---');
  }, [location.pathname, navigationType, location.state]);

  // Save scroll position when user scrolls
  useEffect(() => {
    const handleScroll = (): void => {
      if (!isRestoring.current) {
        const newPosition = {
          x: window.scrollX,
          y: window.scrollY,
        };
        scrollPositions.current[location.pathname] = newPosition;

        // Debug: Log scroll position saves
        if (newPosition.y > 0) {
          // console.log(`💾 Saved scroll position for ${location.pathname}:`, newPosition.y);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Handle scroll restoration/reset based on navigation type
  useLayoutEffect(() => {
    const currentPath = location.pathname;

    // console.log(
    //   `🚀 Navigation detected: ${previousPath.current} → ${currentPath} (${navigationType})`
    // );

    if (navigationType === 'PUSH') {
      // Forward navigation - always scroll to top
      // console.log('📍 PUSH navigation - scrolling to top');
      window.scrollTo(0, 0);
      // Clear any saved position for this path
      delete scrollPositions.current[currentPath];
      // console.log('🗑️ Cleared saved position for:', currentPath);
    } else if (navigationType === 'POP') {
      // Back navigation - restore saved position
      const savedPosition = scrollPositions.current[currentPath];

      // console.log('⬅️ POP navigation - checking saved position:', savedPosition);

      if (savedPosition && savedPosition.y > 0) {
        isRestoring.current = true;
        // console.log('🔄 Restoring position to:', savedPosition.y);

        // First scroll to top to prevent flicker
        window.scrollTo(0, 0);

        // Then restore position after a short delay
        const restorePosition = (): void => {
          const maxScrollY = Math.max(
            document.body.scrollHeight - window.innerHeight,
            document.documentElement.scrollHeight - window.innerHeight,
            0
          );

          const targetY = Math.min(savedPosition.y, maxScrollY);

          // console.log('📏 Content height check - Target:', targetY, 'Max:', maxScrollY);

          if (targetY > 0) {
            // Smooth scroll to saved position
            window.scrollTo({
              top: targetY,
              left: savedPosition.x,
              behavior: 'smooth',
            });

            // console.log('✅ Restored scroll position to:', targetY);

            // Reset restoring flag after animation
            setTimeout(() => {
              isRestoring.current = false;
              console.log('🏁 Restoration complete');
            }, 500);
          } else {
            isRestoring.current = false;
            // console.log('❌ Could not restore - target position is 0');
          }
        };

        // Try to restore position with multiple attempts
        const attemptRestore = (attempt: number = 0): void => {
          const maxAttempts = 5;
          const delays = [50, 150, 300, 500, 1000];

          if (attempt >= maxAttempts) {
            isRestoring.current = false;
            // console.log('❌ Max restoration attempts reached');
            return;
          }

          setTimeout(() => {
            const currentMaxScrollY = Math.max(
              document.body.scrollHeight - window.innerHeight,
              document.documentElement.scrollHeight - window.innerHeight,
              0
            );

            // console.log(`🔄 Restoration attempt ${attempt + 1}:`, {
            //   targetY: savedPosition.y,
            //   currentMaxScrollY,
            //   canRestore: currentMaxScrollY >= savedPosition.y,
            // });

            if (currentMaxScrollY >= savedPosition.y || attempt === maxAttempts - 1) {
              restorePosition();
            } else {
              // console.log(`⏳ Content not ready, trying again in ${delays[attempt]}ms`);
              attemptRestore(attempt + 1);
            }
          }, delays[attempt]);
        };

        attemptRestore();
      } else {
        // No saved position or position is at top
        // console.log('🔝 No saved position - scrolling to top');
        window.scrollTo(0, 0);
        isRestoring.current = false;
      }
    }

    previousPath.current = currentPath;
  }, [location.pathname, navigationType]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // console.log('🧹 SmartScrollManager unmounting - clearing positions');
      scrollPositions.current = {};
    };
  }, []);

  return null;
};

export default SmartScrollManager;
