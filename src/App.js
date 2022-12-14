import './App.css';
import { BrowserRouter, HashRouter, Routes, Redirect, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import { UserProvider } from 'context/UserContext';
import { GlobalProvider } from 'context/GlobalContext';
import { MainProvider } from 'context/MainContext';
import { Oval } from 'react-loader-spinner';

const Main = loadable(() => import('pages/Main'), {
    fallback: (
        <div className="loading">
            <Oval color="#00BFFF" height={80} width={80} timeout={10000} />
        </div>
    ),
});
const LogIn = loadable(() => import('pages/Login'), {
    fallback: (
        <div className="loading">
            <Oval color="#00BFFF" height={80} width={80} timeout={10000} />
        </div>
    ),
});
const SignUp = loadable(() => import('pages/Signup'), {
    fallback: (
        <div className="loading">
            <Oval color="#00BFFF" height={80} width={80} timeout={10000} />
        </div>
    ),
});
const Find = loadable(() => import('pages/Find'), {
    fallback: (
        <div className="loading">
            <Oval color="#00BFFF" height={80} width={80} timeout={10000} />
        </div>
    ),
});

const Dtail = loadable(() => import('pages/Dtail'), {
    fallback: (
        <div className="loading">
            <Oval color="#00BFFF" height={80} width={80} timeout={10000} />
        </div>
    ),
});
const MyPage = loadable(() => import('pages/Mypage'), {
    fallback: (
        <div className="loading">
            <Oval color="#00BFFF" height={80} width={80} timeout={10000} />
        </div>
    ),
});

const Agree = loadable(() => import('contract/Agree'), {
    fallback: (
        <div className="loading">
            <Oval color="#00BFFF" height={80} width={80} timeout={10000} />
        </div>
    ),
});

const Terms = loadable(() => import('contract/Terms'), {
    fallback: (
        <div className="loading">
            <Oval color="#00BFFF" height={80} width={80} timeout={10000} />
        </div>
    ),
});

const Sns = loadable(() => import('contract/Sns'), {
    fallback: (
        <div className="loading">
            <Oval color="#00BFFF" height={80} width={80} timeout={10000} />
        </div>
    ),
});

const Kakao = loadable(() => import('pages/Kakao'), {
    fallback: (
        <div className="loading">
            <Oval color="#00BFFF" height={80} width={80} timeout={10000} />
        </div>
    ),
});

const Notice = loadable(() => import('contract/Footer/Notice'), {
    fallback: (
        <div className="loading">
            <Oval color="#00BFFF" height={80} width={80} timeout={10000} />
        </div>
    ),
});

const Declar = loadable(() => import('contract/Footer/Declar'), {
    fallback: (
        <div className="loading">
            <Oval color="#00BFFF" height={80} width={80} timeout={10000} />
        </div>
    ),
});

function App() {
    return (
        <GlobalProvider>
            <UserProvider>
                <MainProvider>
                    <BrowserRouter basename="/">
                        <Routes>
                            <Route exact path="/*" element={<Main />} /> {/* => ??????????????? */}
                            <Route path="login/*" element={<LogIn />} /> {/* => ?????????????????? */}
                            <Route path="signup" element={<SignUp />} /> {/* => ???????????? ????????? */}
                            <Route path="find/*" element={<Find />} />
                            {/* => ????????? ???????????? ?????? ????????? */}
                            <Route path="detail/*" element={<Dtail />} /> {/* => ??????????????? */}
                            <Route path="mypage/*" element={<MyPage />} /> {/* => ??????????????? */}
                            <Route path="api/auth/kakao/callback" element={<Kakao />} />{' '}
                            {/* => ????????? ????????? ????????? */}
                            {/* ?????? ?????? ????????? */}
                            <Route path="signup/agreement/agree" element={<Agree />} />
                            <Route path="signup/agreement/terms" element={<Terms />} />
                            <Route path="signup/agreement/sns" element={<Sns />} />
                            {/* ?????? ???????????? */}
                            <Route path="footer/notice" element={<Notice />} />
                            <Route path="footer/declar" element={<Declar />} />
                        </Routes>
                    </BrowserRouter>
                </MainProvider>
            </UserProvider>
        </GlobalProvider>
    );
}

export default App;
