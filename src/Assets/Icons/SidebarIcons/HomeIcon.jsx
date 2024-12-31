import React from 'react'

const HomeIcon = ({ isActive = '#9E090F' }) => {
       return (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M21.6147 9.59985C21.6147 9.28158 21.4883 8.97636 21.2633 8.75131C21.0382 8.52626 20.733 8.39983 20.4147 8.39983C20.0965 8.39983 19.7913 8.52626 19.5662 8.75131C19.3412 8.97636 19.2147 9.28158 19.2147 9.59985H21.6147ZM4.81475 9.59985C4.81475 9.28158 4.68832 8.97636 4.46327 8.75131C4.23823 8.52626 3.93301 8.39983 3.61475 8.39983C3.29649 8.39983 2.99126 8.52626 2.76622 8.75131C2.54117 8.97636 2.41475 9.28158 2.41475 9.59985H4.81475ZM21.9663 12.8483C22.1927 13.0669 22.4958 13.1878 22.8104 13.1851C23.1251 13.1824 23.426 13.0562 23.6485 12.8337C23.871 12.6112 23.9972 12.3102 24 11.9956C24.0027 11.6809 23.8817 11.3778 23.6631 11.1515L21.9663 12.8483ZM12.0147 1.19976L12.8631 0.351347C12.6381 0.12638 12.3329 0 12.0147 0C11.6965 0 11.3914 0.12638 11.1663 0.351347L12.0147 1.19976ZM0.366346 11.1515C0.251734 11.2622 0.160315 11.3946 0.0974242 11.541C0.0345334 11.6874 0.00142989 11.8449 4.53081e-05 12.0042C-0.00133927 12.1635 0.0290228 12.3215 0.0893599 12.469C0.149697 12.6165 0.238801 12.7505 0.351472 12.8632C0.464143 12.9758 0.598125 13.0649 0.745601 13.1253C0.893077 13.1856 1.05109 13.216 1.21043 13.2146C1.36976 13.2132 1.52723 13.1801 1.67363 13.1172C1.82004 13.0543 1.95245 12.9629 2.06315 12.8483L0.366346 11.1515ZM6.01475 24H18.0147V21.6H6.01475V24ZM21.6147 20.4V9.59985H19.2147V20.4H21.6147ZM4.81475 20.4V9.59985H2.41475V20.4H4.81475ZM23.6631 11.1515L12.8631 0.351347L11.1663 2.04817L21.9663 12.8483L23.6631 11.1515ZM11.1663 0.351347L0.366346 11.1515L2.06315 12.8483L12.8631 2.04817L11.1663 0.351347ZM18.0147 24C18.9695 24 19.8852 23.6207 20.5603 22.9456C21.2355 22.2704 21.6147 21.3548 21.6147 20.4H19.2147C19.2147 20.7182 19.0883 21.0235 18.8633 21.2485C18.6382 21.4735 18.333 21.6 18.0147 21.6V24ZM6.01475 21.6C5.69649 21.6 5.39126 21.4735 5.16622 21.2485C4.94117 21.0235 4.81475 20.7182 4.81475 20.4H2.41475C2.41475 21.3548 2.79403 22.2704 3.46916 22.9456C4.14429 23.6207 5.05997 24 6.01475 24V21.6Z" fill={isActive ? "#9E090F" : "white"} />
              </svg>

       )
}

export default HomeIcon