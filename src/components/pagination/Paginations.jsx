import { useState, useEffect } from 'react'

// css
import './Paginations.scss'

const Paginations = ({dataPerHalaman, halamanAktif, setHalamanAktif, totalData, paginate}) => {
    const pageNumbers = []

    const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])

    for(let i = 1; i <= Math.ceil(totalData / dataPerHalaman); i++ ) {
        pageNumbers.push(i)
    }

    useEffect(() => {
        let tempNumberOfPages = [...arrOfCurrButtons]
    
        let dotsInitial = '...'
        let dotsLeft = '... '
        let dotsRight = ' ...'
    
        if (pageNumbers.length < 2) {
          tempNumberOfPages = pageNumbers
        }
    
        else if (halamanAktif >= 1 && halamanAktif <= 2) {
          tempNumberOfPages = [1, 2, 3, dotsInitial, pageNumbers.length]
        }
    
        else if (halamanAktif === 3) {
          const sliced = pageNumbers.slice(0, 3)
          tempNumberOfPages = [...sliced, dotsInitial, pageNumbers.length]
        }
    
        else if (halamanAktif > 4 && halamanAktif < pageNumbers.length - 2) {               
          const sliced1 = pageNumbers.slice(halamanAktif - 2, halamanAktif)              
          const sliced2 = pageNumbers.slice(halamanAktif, halamanAktif + 1)                 
          tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, pageNumbers.length])
        }
        
        else if (halamanAktif > pageNumbers.length - 3) {                 
          const sliced = pageNumbers.slice(pageNumbers.length - 3)   
          tempNumberOfPages = ([1, dotsLeft, ...sliced])                        
        }
        
        else if (halamanAktif === dotsInitial) {
          setHalamanAktif(arrOfCurrButtons[arrOfCurrButtons.length-3] + 1) 
        }
        else if (halamanAktif === dotsRight) {
          setHalamanAktif(arrOfCurrButtons[3] + 2)
        }
    
        else if (halamanAktif === dotsLeft) {
          setHalamanAktif(arrOfCurrButtons[3] - 2)
        }
    
        setArrOfCurrButtons(tempNumberOfPages)
        setHalamanAktif(halamanAktif)
      }, [halamanAktif])

    return (
        <>
          <nav>
              <ul className="pagination">
                  {/* handle prev */}
                  {halamanAktif > 1 && <p className="page-link prev" onClick={() => paginate(halamanAktif - 1)}>&laquo;</p> }

                  {arrOfCurrButtons?.map(number => (
                    <li key={number} className={number === halamanAktif ? "page-item active" : "page-item"}>
                      <p onClick={() => {paginate(number)}} className="page-link">{number}</p>
                    </li>
                  ))}

                  {/* handle next */}
                  {halamanAktif < pageNumbers.length && <p className="page-link next" onClick={() => paginate(halamanAktif + 1)}>&raquo;</p> }
              </ul>
          </nav>
        </>
    )
}

  export default Paginations