import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { BallTriangle } from 'react-loader-spinner'
import Review from './Review';
const Detail = () => {

    document.title = "ScreenCraze | Detail"
    const { id } = useParams();
    const [loader, setLoader] = useState(true)
    const [data, setData] = useState({
        title: "",
        year: "",
        image: "",
        description: "",
        rating: 0,
        rated: 0
    })
    useEffect(() => {
        async function getData() {

            const _doc = doc(db, "movies", id)
            const fetch = await getDoc(_doc)
            setData(fetch.data())
            setLoader(false)
        }
        getData()
    })
    return (
        <>
            {loader ? <div className='flex justify-center items-center mt-24'><BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#9333ea"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
            /></div> :
                <section className="text-gray-600 body-font overflow-hidden">
                    <div className="container px-5 py-16 mx-auto">
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <img alt="ecommerce" className="lg:w-1/2 md:w-full lg:h-full h-96 md:h-64 object-cover object-center rounded" src={data.image} />

                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-rose-500 tracking-widest">{data.year}</h2>
                                <h1 className="text-white text-3xl title-font font-medium mb-1">{data.title}</h1>
                                <span><ReactStars
                                    count={5}
                                    half={true}
                                    value={data.rating / data.rated}
                                    edit={false}
                                    size={19}
                                    color2={'#ffd700'} />
                                    <p className='text-gray-300 text-sm'>{`(${data.rated})`}</p></span>
                                <p className="leading-relaxed text-gray-400 ">{data.description}</p>
                                <Review id={id} prevRating={data.rating} userRated={data.rated} />
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default Detail
