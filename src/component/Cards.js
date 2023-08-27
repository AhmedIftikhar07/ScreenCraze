import React, { useState } from 'react'

const Cards = () => {
    const [data, setData] = useState([
        {
            img: "/movie.jpg",
            name: "Shadow",
            year: 2023,
            rating: 5,
        },
        {
            img: "/movie.jpg",
            name: "Shadow",
            year: 2023,
            rating: 5,
        },
        {
            img: "/movie.jpg",
            name: "Shadow",
            year: 2023,
            rating: 5,
        },
        {
            img: "/movie.jpg",
            name: "Shadow",
            year: 2023,
            rating: 5,
        },
        {
            img: "/movie.jpg",
            name: "Shadow",
            year: 2023,
            rating: 5,
        },
        {
            img: "/movie.jpg",
            name: "Shadow",
            year: 2023,
            rating: 5,
        },
        {
            img: "/movie.jpg",
            name: "Shadow",
            year: 2023,
            rating: 5,
        },
        {
            img: "/movie.jpg",
            name: "Shadow",
            year: 2023,
            rating: 5,
        },
        {
            img: "/movie.jpg",
            name: "Shadow",
            year: 2023,
            rating: 5,
        },
        {
            img: "/movie.jpg",
            name: "Shadow",
            year: 2023,
            rating: 5,
        },
    ])
    return (
        <div className='flex flex-wrap justify-evenly p-3 mt-2'>
            {
                data.map((e, i) => {
                    return (
                        <>
                            <div key={i} className='card  font-medium shadow-xl p-2 hover:-translate-y-3 transition-all duration-500 cursor-pointer mt-6'>
                                <img className='h-72 mb-2' src={e.img} alt={e.name} />
                                <h1><span className='text-rose-600 text-sm'>Name: </span>{e.name}</h1>
                                <h1><span className='text-rose-600 text-sm'>Year: </span>{e.year}</h1>
                                <h1><span className='text-rose-600 text-sm'>Rating: </span>{e.rating}</h1>
                            </div>
                        </>
                    )
                })


            }

        </div>
    )
}

export default Cards
