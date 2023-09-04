import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviewsRef, db } from '../firebase/firebase'
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore'
import swal from 'sweetalert'
// import Spninner from './Spninner'
import { AppState } from '../App'
import { TailSpin, ThreeDots } from 'react-loader-spinner'






const Review = ({ id, prevRating, userRated }) => {
    const useAppState = useContext(AppState)
    const [rating, setRating] = useState(0)
    const [loader, setLoader] = useState(false)
    const [form, setForm] = useState('')
    const [data, setData] = useState([])
    const [reviewsloader, setReviewsLoader] = useState(false)



    const sentReview = async (e) => {
        setLoader(true)
        try {
            await addDoc(reviewsRef, {
                movieid: id,
                name: useAppState.userName,
                rating: rating,
                thought: form,
                timestam: new Date().getTime()
            })

            const ref = doc(db, "movies", id)
            await updateDoc(ref, {
                rating: prevRating + rating,
                rated: userRated + 1
            })

            setRating(0)
            setForm("")
            swal({
                text: 'Review Sent',
                icon: 'success',
                buttons: false,
                timer: 3000,
            });
            window.location.reload();
        } catch (error) {
            swal({
                text: error.message,
                icon: 'error',
                buttons: false,
                timer: 3000,
            });
        }
        setLoader(false)
    }

    useEffect(() => {
        async function getData() {
            setReviewsLoader(true)

            let quer = query(reviewsRef, where('movieid', '==', id))
            const querysnapShot = await getDocs(quer)
            querysnapShot.forEach((doc) => {
                setData((perv) => [...perv, doc.data()])
            })

            setReviewsLoader(false)
        }
        getData()
    }, [id])


    let tokeen = localStorage.getItem('userUID') ?? '';
    let isLoggedIn = false;

    if (tokeen !== '') {

        isLoggedIn = true;


    } else {

        isLoggedIn = false;

    }


    return (
        <div className='mt-4 w-full border-t-2 border-zinc-900'>
            <h1 className='mt-2'>Review</h1>
            {isLoggedIn ?
                <>
                    <ReactStars className='mb-2'
                        count={5}
                        half={true}
                        value={rating}
                        onChange={(rate) => setRating(rate)}
                        size={24}
                        color2={'#ffd700'} />


                    <textarea
                        value={form}
                        onChange={(e) => setForm(e.target.value)}
                        className='w-full h-24 p-2 outline-none bg-zinc-950 text-white border-purple-700 border'
                        placeholder='Share your thoughts about this movie'
                    />
                    <button onClick={sentReview} className="mt-3 text-white bg-purple-600 border-0 py-2 px-4 focus:outline-none hover:bg-purple-700 active:bg-purple-900 transition-all duration-200 rounded text-sm">
                        {loader ? <TailSpin color='white' height={20} width={42} /> : 'SHARE'}
                    </button>
                </>
                : <p className='text-rose-500 text-sm'>Please Signup or Login your account to give a review</p>
            }


            {
                reviewsloader ? <div className='mt-5'><ThreeDots height={10} color='white' /></div>
                    : <div className='mt-6'>
                        <h1 className='text-purple-600 text-lg'>Reviews:</h1>
                        {data.length === 0 ? <p className='text-white mt-2'>No reviews yet !</p> : null}
                        {data.map((e, i) => {
                            return (
                                <>
                                    <div className='text-white mt-4 bg-gray-950 p-2 rounded-lg' key={i}>
                                        <ul>
                                            <li><p>{e.name} :</p></li>
                                            <ReactStars className='mb-1'
                                                count={5}
                                                half={true}
                                                value={e.rating}
                                                size={15}
                                                edit={false}
                                                color2={'#ffd700'} />
                                            <li><p className='opacity-70 ml-4'>{e.thought}</p></li>
                                            <li><p className='text-gray-600 text-xs ml-4'>{new Date(e.timestam).toLocaleString()}</p></li>
                                        </ul>
                                    </div>
                                </>
                            )
                        })}
                    </div>
            }
        </div>
    )
}

export default Review
