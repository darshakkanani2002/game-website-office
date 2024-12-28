import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'

export default function Game() {
    return (
        <div className='content-padding'>
            <div className='background-height-bg overflow-auto'>
                <div className='py-4'>
                    <div className='d-flex align-items-center'>
                        <div>
                            <img src="/public/img/play-game.gif" alt="play-game" className='img-fluid quize-tournament-img' />
                        </div>
                        <div>
                            <p className='mb-0 fw-bold pt-2'>All Games</p>
                        </div>
                    </div>

                    <div className='container-fluid'>
                        <div className='row py-3'>
                            <div className='col-6 col-sm-6 col-md-6 col-lg-3 mb-3'>
                                <div className='position-relative'>
                                    <img src="../../../public/img/all-game-img-01.png" alt="all-game-img-01" className='img-fluid all-game-img w-100' />
                                    <div className='game-name-plate'>
                                        <div className='d-flex align-items-center justify-content-between game-name-btn py-2 px-2'>
                                            <div>
                                                <span className='fw-semibold text-black'>Merge Block</span>
                                            </div>
                                            <div>
                                                <a href='../../../anonymous' className='game-play-btn py-1 px-2 rounded-pill'>Play</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-6 col-sm-6 col-md-6 col-lg-3 mb-3'>
                                <div className='position-relative'>
                                    <img src="../../../public/img/all-game-img-02.png" alt="all-game-img-02" className='img-fluid all-game-img w-100' />
                                    <div className='game-name-plate'>
                                        <div className='d-flex align-items-center justify-content-between game-name-btn py-2 px-2'>
                                            <div>
                                                <span className='fw-semibold text-black'>Sling Tomb</span>
                                            </div>
                                            <div>
                                                <Link to='../../../aladin-magic-sloat/' className='game-play-btn py-1 px-2 rounded-pill'>Play</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-6 col-sm-6 col-md-6 col-lg-3 mb-3'>
                                <div className='position-relative'>
                                    <img src="../../../public/img/all-game-img-03.png" alt="all-game-img-03" className='img-fluid all-game-img w-100' />
                                    <div className='game-name-plate'>
                                        <div className='d-flex align-items-center justify-content-between game-name-btn py-2 px-2'>
                                            <div>
                                                <span className='fw-semibold text-black'>Sling Tomb</span>
                                            </div>
                                            <div>
                                                <Link to='../../../ball-jump/' className='game-play-btn py-1 px-2 rounded-pill'>Play</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-6 col-sm-6 col-md-6 col-lg-3 mb-3'>
                                <div className='position-relative'>
                                    <img src="../../../public/img/all-game-img-04.png" alt="all-game-img-04" className='img-fluid all-game-img w-100' />
                                    <div className='game-name-plate'>
                                        <div className='d-flex align-items-center justify-content-between game-name-btn py-2 px-2'>
                                            <div>
                                                <span className='fw-semibold text-black'>Sling Tomb</span>
                                            </div>
                                            <div>
                                                <Link to='../../../bike-rush/' className='game-play-btn py-1 px-2 rounded-pill'>Play</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </div>
    )
}
