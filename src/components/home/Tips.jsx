import React from 'react';
import { useNavigate } from 'react-router-dom';

const tips = [
  {
    id: 1,
    num: '01',
    title: 'Datang pagi hari',
    description: 'Sebagian spot alam dan hidden gems lebih sejuk dan belum ramai sebelum jam 9 pagi.',
    icon: 'fa-sun'
  },
  {
    id: 2,
    num: '02',
    title: 'Bawa uang tunai',
    description: 'Beberapa spot di kecamatan terpencil belum menerima pembayaran non-tunai.',
    icon: 'fa-money-bill-wave'
  },
  {
    id: 3,
    num: '03',
    title: 'Cek jalur akses',
    description: 'Sebagian hidden gems memerlukan trekking singkat, gunakan alas kaki yang sesuai.',
    icon: 'fa-route'
  },
  {
    id: 4,
    num: '04',
    title: 'Jaga kebersihan',
    description: 'Bawa kembali sampahmu agar hidden gems tetap asri untuk penjelajah berikutnya.',
    icon: 'fa-recycle'
  }
];

const Tips = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/search');
  };

  return (
    <section id="tips" className="tips-section">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="eyebrow">Sebelum berangkat</span>
            <h2>Tips perjalanan</h2>
            <p>Beberapa catatan singkat supaya kunjunganmu lebih nyaman.</p>
          </div>
        </div>

        <div className="tips-grid">
          {tips.map((tip) => (
            <div key={tip.id} className="tip-card">
              <p className="tip-num">Tip {tip.num}</p>
              <div className="tip-icon">
                <i className={`fas ${tip.icon}`}></i>
              </div>
              <h3>{tip.title}</h3>
              <p>{tip.description}</p>
            </div>
          ))}
        </div>

        <div className="tips-cta">
          <div className="tips-cta-content">
            <h3>Siap Menjelajahi Sumedang? 🚀</h3>
            <p>Temukan tempat wisata terbaik dan buat kenangan tak terlupakan</p>
            <button className="btn btn-gold" onClick={handleStartJourney}>
              <i className="fas fa-rocket"></i> Mulai Perjalanan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tips;