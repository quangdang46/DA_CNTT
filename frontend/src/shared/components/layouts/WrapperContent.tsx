import Breadcrumb from '@/shared/components/ui/Breadcrumb'
import React from 'react'

export default function WrapperContent({children,className}:{children:React.ReactNode,className?:string}) {
  return (
       <div id="content" className={`site-content ${className}`} >
          <div className="col-full">
            <div className="row">
              <Breadcrumb></Breadcrumb>
    
              <div id="primary" className="content-area">
                <main id="main" className="site-main">
                  
                 {children}
                </main>
              </div>
            </div>
          </div>
        </div>
  )
}
