import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
// import { AudioSpinner } from './Spninner'
// import { Bars } from 'react-loader-spinner'
import { AudioSpinner } from './Spninner'
import { getDocs } from 'firebase/firestore'
import { moviesRef } from '../firebase/firebase'
import { Link } from 'react-router-dom'


const Cards = () => {
    document.title = "ScreenCraze | Home"

    const [data, setData] = useState([])
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        async function getData() {
            setLoader(true)
            const fetchdata = await getDocs(moviesRef)
            fetchdata.forEach((doc) => {
                setData((pre) => [...pre, { ...(doc.data()), id: doc.id }])
            })
            setLoader(false)
        }
        getData()
    }, [])



    return (
        <div className='flex flex-wrap justify-evenly p-3 mt-2'>
            {loader ? <div className='flex flex-wrap justify-evenly'><AudioSpinner /></div> :
                data.map((e, i) => {
                    return (
                        <>
                            <Link to={`/detail/${e.id}`}><div key={i} className='card font-medium shadow-xl p-2 py-3 hover:-translate-y-3 transition-all duration-500 cursor-pointer mt-6'>
                                <img className='h-72 mb-2 w-full' src={e.image} alt={e.title} />
                                <h1><span className='text-rose-600 text-sm '>Name: </span>{e.title}</h1>
                                <h1><span className='text-rose-600 text-sm'>Year: </span>{e.year}</h1>
                                <h1 className='flex items-center'><span className='text-rose-600 text-sm  mr-1'>Rating:</span> <ReactStars
                                    count={5}
                                    half={true}
                                    value={e.rating / e.rated}
                                    edit={false}
                                    size={19}
                                    color2={'#ffd700'} />
                                </h1>
                            </div></Link>

                        </>
                    )

                })



            }
        </div>
    )
}

export default Cards
// {
//     userContext.login ? <div>{"UserName" + userContext.userName}</div> : null
// }