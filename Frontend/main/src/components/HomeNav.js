import React from 'react';
import '../css/homenav.css';
import '../css/font-awesome-4.7.0/css/font-awesome.min.css'
export const HomeNav = () => {
  
  return (
    
    <main className="site-wrapper">
      
      <div className="pt-table desktop-768">
        <div
          className="pt-tablecell page-home relative">
          

          <div className="container1">
            <div className="row">
              <div className="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-2 col-lg-8">
                

                <div className="hexagon-menu clear">
                  
                  {Array.from({ length: 7 }, (_, i) => (
                    <div className="hexagon-item" key={i}>
                      <div className="hex-item">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="hex-item">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <a className="hex-content" href={linkPage(i)}>
                        <span className="hex-content-inner">
                          <span className="icon">
                            {renderIcon(i)}
                          </span>
                          <span className="title">{renderTitle(i)}</span>
                        </span>
                        <svg
                          viewBox="0 0 173.20508075688772 200"
                          height="200"
                          width="174"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50L"
                            fill="#1e2530"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </main>
    
  );
};


const renderIcon = (index) => {
  const icons = [
    'fa-universal-access',
    'fa-sign-in',
    'fa-user',
    'fa-sign-out',
    'fa-clipboard',
    'fa-bullseye',
    'fa-map-signs',
  ];

  return <i className={`fa ${icons[index]}`}></i>;
};

const linkPage = (index) => {
    const links = [
        '#wel',
        '/login',
        '/register',
        '',
        '',
        '',
        '',
    ];
    return links[index];
};

const renderTitle = (index) => {
  const titles = ['Welcome', 'SignIn','Register','SignOut', 'Works', 'About', 'Contact'];
  return titles[index];
};

export default HomeNav;
