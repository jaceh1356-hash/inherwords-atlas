import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SimpleFooter: React.FC = () => {
  return (
    <footer className="w-full" style={{ backgroundColor: '#323232' }}>
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-0">
        <div className="flex justify-between items-center">
          {/* Left side - Until logo */}
          <div className="flex-1 flex items-center">
            <Link 
              href="https://www.until.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/until.png"
                alt="Until Org"
                width={100}
                height={50}
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </Link>
          </div>
          
          {/* Center - Logo and copyright in one line */}
          <div className="flex-1 flex items-center justify-center space-x-3">
            <Image
              src="/logo.png"
              alt="InHerWords Logo"
              width={32}
              height={32}
            />
            <div className="text-center">
              <p className="text-sm leading-tight" style={{ color: '#fcfcfc' }}>
                © 2025 In Her Words. All rights reserved.
              </p>
              <p className="text-xs leading-tight" style={{ color: '#fcfcfc' }}>
                Created with compassion for women worldwide
              </p>
            </div>
          </div>
          
          {/* Right side - social icons */}
          <div className="flex-1 flex justify-end items-center space-x-4">
            <Link 
              href="https://www.instagram.com/untilorg/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:opacity-80"
              style={{ color: '#fcfcfc' }}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.017 0C8.396 0 7.999.016 6.79.08 5.588.144 4.784.272 4.112.485c-.696.275-1.302.64-1.893 1.232-.491.49-.856 1.197-1.13 1.893C.856 4.288.729 5.092.665 6.294.601 7.502.584 7.898.584 11.52c0 3.621.017 4.017.081 5.225.064 1.202.191 2.006.405 2.678.274.696.639 1.302 1.23 1.893.491.49 1.198.857 1.894 1.131.67.213 1.475.34 2.677.405 1.208.066 1.604.082 5.225.082 3.622 0 4.018-.016 5.226-.082 1.203-.065 2.007-.192 2.678-.405.696-.274 1.403-.641 1.893-1.131.49-.491.857-1.197 1.131-1.893.213-.671.34-1.476.405-2.678.066-1.208.082-1.604.082-5.225 0-3.622-.016-4.018-.082-5.226-.065-1.202-.192-2.006-.405-2.677-.274-.696-.641-1.403-1.131-1.893C19.586.856 18.879.49 18.183.216c-.67-.213-1.475-.34-2.678-.405C14.297.016 13.901 0 12.017 0zm0 2.167c3.542 0 3.966.016 5.162.081 1.245.057 1.922.266 2.372.442.596.23 1.022.506 1.47.954.448.448.724.874.954 1.47.176.45.385 1.127.442 2.372.065 1.196.081 1.62.081 5.162s-.016 3.966-.081 5.162c-.057 1.245-.266 1.922-.442 2.372-.23.596-.506 1.022-.954 1.47-.448.448-.874.724-1.47.954-.45.176-1.127.385-2.372.442-1.196.065-1.62.081-5.162.081s-3.966-.016-5.162-.081c-1.245-.057-1.922-.266-2.372-.442-.596-.23-1.022-.506-1.47-.954-.448-.448-.724-.874-.954-1.47-.176-.45-.385-1.127-.442-2.372-.065-1.196-.081-1.62-.081-5.162s.016-3.966.081-5.162c.057-1.245.266-1.922.442-2.372.23-.596.506-1.022.954-1.47.448-.448.874-.724 1.47-.954.45-.176 1.127-.385 2.372-.442 1.196-.065 1.62-.081 5.162-.081z"
                  clipRule="evenodd"
                />
                <path d="M12.017 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.76 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </Link>
            
            <Link
              href="https://www.linkedin.com/company/untilorg/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:opacity-80"
              style={{ color: '#fcfcfc' }}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
