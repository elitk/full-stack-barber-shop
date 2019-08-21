import React, { Component } from 'react';
import barber from '../img/asulin.jpg'
import barber2 from '../img/elad.jpg'
import './About.css'
class About extends Component {
    state = {}
    render() {
        return (
       
            <div className='test'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-sm-4'>
                            <div className='card middle'>
                                <div className='front'>
                                    <img src={barber} alt="" />
                                </div>
                                <div className='back'>
                                    <div className='back-content middle'>
                                    <h2>Asulin Hair design</h2>

                                        <div className='sm'>
                                        <a href='https://www.facebook.com/emanuel.assulin.9' className='one'><i className="fab fa-facebook"></i></a>
                                      <a href='https://www.instagram.com/emanuels_hairdesigns/' className='two' ><i className="fab fa-instagram"></i></a>
                                        {/* <a href='#' className='three'><i class="fab fa-youtube"></i></a>  */}
                                         </div>
                                 </div>
                                 </div>
                             </div>
                         </div>
                         <div className='col-sm-4'>
                             <div className='card middle'>
                                 <div className='front'>
                                     <img src={barber2} alt="" />
                                 </div>
                                 <div className='back'>
                                     <div className='back-content middle'>
                                     <h2>Asulin Hair design</h2>

                                         <div className='sm'>
                                             <a href='https://www.facebook.com/elad.tede.96' className='one'><i className="fab fa-facebook"></i></a>
                                             <a href='https://www.instagram.com/elad_tede/' className='two' ><i className="fab fa-instagram"></i></a>
                                             {/* <a href='#' className='three'><i class="fab fa-youtube"></i></a> */}
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                         <div className='col-sm-4'>
                             <div className='card middle'>
                                 <div className='front'>
                                     <img src={barber} alt="" />
                                 </div>
                                 <div className='back'>
                                     <div className='back-content middle'>
                                         <h2>Asulin Hair design</h2>

                                         <div className='sm'>
                                         <a href='https://www.facebook.com/emanuel.assulin.9' className='one'><i className="fab fa-facebook"></i></a>
                                         <a href='https://www.instagram.com/emanuels_hairdesigns/' className='two' ><i className="fab fa-instagram"></i></a>
                                             {/* <a href='#' className='three'><i class="fab fa-youtube"></i></a> */}
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
        );
    }
}

export default About;