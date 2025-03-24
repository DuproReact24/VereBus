import { useCallback, useEffect, useRef, useState } from 'react'
import '../Home/Home.css'
import Header from '../../components/header/Header'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setSearch } from '../../store/trip/tripslice'
import { useHistory } from 'react-router-dom'

export default function Home() {
  let [counter,setCount] = useState<any>(0)
 
  const count = useRef(counter)
 
 
  const [slideWidth,setSlidewidth] = useState(100)
  const [imge,setImge] = useState([
   
    "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
   "https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=120&q=80",
   'https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=120&q=80',
    'https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=120&q=80'

  ])
  const [translate,setTranslate] = useState<string>('translateX(0%)')
  const [departure, setDeparture] = useState(0);

  const [destination, setDestination] = useState(0);

  const [date, setDate] = useState("");

  const [form,setForm] = useState({
    to:departure,
    from:destination,
    date:date
  })


  const handlePrev = (data: any) => {
    setCount((prev: number) => {
      if (prev <= 0) {
        console.log("Đã đạt giới hạn đầu tiên, quay về cuối");
        const translate = `translateX(${-slideWidth * (imge.length - 1)}%)`;
        setTranslate(translate);
        return imge.length - 1; 
      } else {
        console.log({ prev });
        const translate = `translateX(${-slideWidth * (prev - 1)}%)`;
        setTranslate(translate);
        return prev - 1;
      }
    });
  };
  
  const handleNext =(data:any)=>{
    
    if(data >= imge.length-1){
   
      setCount(counter-=imge.length-1)
      const nextCount = 0
      const translate= `translateX(${-slideWidth * nextCount}%)`
      setTranslate(translate)
     

    }else{
    
      console.log(counter)
      setCount(counter+= 1)


    
      const translate= `translateX(${-slideWidth * counter}%)`
      console.log(translate)
      console.log(counter)
      setTranslate(translate)
   
    }

  }
  const history = useHistory()
  const dispatch = useDispatch()
  const handleSearch = () => {
   const payload ={
    from:departure,
    to:destination,
    date:date
   }
    dispatch(setSearch(payload))
    history.push('/ticket')

  };
  useEffect(() => { 
    count.current = counter
   },[counter])
  useEffect(() => { 
  const interval =  setInterval(() => { 
      if ( count.current == imge.length - 1 ) {
        setCount((prev:any) => {
          
        const translate = `translateX(${-slideWidth * prev}%)`
        setTranslate(translate)
        return  count.current = 0
        })
       
    } else {
    
      setCount((prev:any) => {
   
        
        const translate= `translateX(${-slideWidth * prev}%)`
        setTranslate(translate)
        return  count.current =  prev+1
      
    
      }
    )
      
      
      
   
    }
   

     },10000)
     return () => clearInterval(interval);
   },[])
 
  return (
    <>


<div className="hero">
  <div className="hero-content">
    <h1>Đặt vé xe khách trực tuyến</h1>
    <p>Dễ dàng - Nhanh chóng - An toàn</p>
    <div className="search-box">
      <div className="search-item">
        <label><i className="fas fa-map-marker-alt" /> Điểm đi</label>
        <select onChange={(e) => { setDestination(Number(e.target.value))}}>
        
        <option>Chọn nơi đến</option>
    
    <option value={1}>Hồ Chí Minh</option>
    <option value={2}>Hà Nội</option>
    <option value={3}>Đà Nẵng</option>
        </select>
      </div>
      <div className="search-item">
        <label><i className="fas fa-map-marker" /> Điểm đến</label>
        <select onChange={(e) => { setDeparture(parseInt(e.target.value)) }}>
        <option>Chọn nơi đến</option>

    <option value={4}>Cà mau</option>
    <option value={5}>Vũng Tàu</option>
    <option value={6}>Nha Trang</option>
        </select>
      </div>
      <div className="search-item">
        <label><i className="far fa-calendar-alt" /> Ngày đi</label>
        <input 
    type="date" 
    value={date} 
    onChange={(e) => setDate(e.target.value)} 
  />
      </div>
      <button type='submit' className="search-btn" onClick={handleSearch}>Tìm kiếm</button>
    </div>
  </div>
</div>

<div className="section-title">
  <h2>Ưu đãi nổi bật</h2>
</div>



{/* /// */}
<div className="slider-container">
  <div className="slider" style={{transform:`${translate}`}}>
    {imge.map((item,index) => { 

      
        return  <div className="slide-item" key={index} >
        <img src={item}/>
        <div className="slide-content">
          <h3>Giảm 20% chuyến Sài Gòn - Đà Lạt</h3>
          <p>Áp dụng đến 30/06/2024</p>
        </div>
      </div>
     })}

   
  </div>

  <button className="prev-button" onClick={() => { handlePrev(counter) }}><i className="fas fa-chevron-left" /></button>
  <button className="next-button" onClick={() => { handleNext(counter) }}><i className="fas fa-chevron-right" /></button>
</div>

  <div className="section-title">
        <h2>Tuyến phổ biến</h2>
    </div>
  <div className="scroll-container">
  <div className="scroll-content">
    <div className="route-item">
      <div className="route-image">
        <img src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=120&q=80" alt="SG-ĐL" />
      </div>
      <div className="route-info">
        <h3>Sài Gòn - Đà Lạt</h3>
        <p>Từ 250.000đ</p>
      </div>
    </div>
    <div className="route-item">
      <div className="route-image">
        <img src="https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=120&q=80" alt="SG-VT" />
      </div>
      <div className="route-info">
        <h3>Sài Gòn - Vũng Tàu</h3>
        <p>Từ 150.000đ</p>
      </div>
    </div>
    <div className="route-item">
      <div className="route-image">
        <img src="https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=120&q=80" alt="SG-NT" />
      </div>
      <div className="route-info">
        <h3>Sài Gòn - Nha Trang</h3>
        <p>Từ 280.000đ</p>
      </div>
    </div>
    <div className="route-item">
      <div className="route-image">
        <img src="https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=120&q=80" alt="HN-SP" />
      </div>
      <div className="route-info">
        <h3>Hà Nội - Sapa</h3>
        <p>Từ 320.000đ</p>
      </div>
    </div>
    <div className="route-item">
      <div className="route-image">
        <img src="https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=120&q=80" alt="HN-HP" />
      </div>
      <div className="route-info">
        <h3>Hà Nội - Hải Phòng</h3>
        <p>Từ 120.000đ</p>
      </div>
    </div>
    <div className="route-item">
      <div className="route-image">
        <img src="https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=120&q=80" alt="HN-V" />
      </div>
      <div className="route-info">
        <h3>Hà Nội - Vinh</h3>
        <p>Từ 220.000đ</p>
      </div>
    </div>
    <div className="route-item">
      <div className="route-image">
        <img src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=120&q=80" alt="ĐN-HUE" />
      </div>
      <div className="route-info">
        <h3>Đà Nẵng - Huế</h3>
        <p>Từ 110.000đ</p>
      </div>
    </div>
    <div className="route-item">
      <div className="route-image">
        <img src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=120&q=80" alt="NT-ĐL" />
      </div>
      <div className="route-info">
        <h3>Nha Trang - Đà Lạt</h3>
        <p>Từ 170.000đ</p>
      </div>
    </div>
  </div>
</div>


<div className="section-title">
  <h2>Bài viết nổi bật</h2>
</div>
<div className="scroll-container">
  <div className="scroll-content">
    <div className="blog-item">
      <div className="blog-image">
        <img src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=120&q=80" alt="Blog 1" />
      </div>
      <div className="blog-info">
        <h3>Xe giường nằm Limousine - đỉnh cao mới của ngành xe khách</h3>
        <p className="blog-preview">Khám phá trải nghiệm đẳng cấp với các dịch vụ xe Limousine hiện đại...</p>
        <a href="#" className="read-more">Đọc tiếp</a>
      </div>
    </div>
    <div className="blog-item">
      <div className="blog-image">
        <img src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=120&q=80" alt="Blog 2" />
      </div>
      <div className="blog-info">
        <h3>Xe limousine đi Vũng Tàu: Tổng hợp top 6 xe chất lượng cao</h3>
        <p className="blog-preview">Những nhà xe limousine đi Vũng Tàu được đánh giá cao nhất hiện nay...</p>
        <a href="#" className="read-more">Đọc tiếp</a>
      </div>
    </div>
    <div className="blog-item">
      <div className="blog-image">
        <img src="https://images.unsplash.com/photo-1471958680802-1345a694ba6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=150&q=80" alt="Blog 3" />
      </div>
      <div className="blog-info">
        <h3>Review xe limousine đi Đà Lạt: những câu hỏi thường gặp</h3>
        <p className="blog-preview">Giải đáp tất cả thắc mắc của bạn về dịch vụ xe limousine đi Đà Lạt...</p>
        <a href="#" className="read-more">Đọc tiếp</a>
      </div>
    </div>
    <div className="blog-item">
      <div className="blog-image">
        <img src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=120&q=80" alt="Blog 4" />
      </div>
      <div className="blog-info">
        <h3>Xe limousine đi Sapa: Tổng hợp top các hãng xe chất lượng cao</h3>
        <p className="blog-preview">Danh sách các nhà xe limousine chất lượng cao phục vụ tuyến Hà Nội - Sapa...</p>
        <a href="#" className="read-more">Đọc tiếp</a>
      </div>
    </div>
  </div>
</div>





    
    </>


  )
}
