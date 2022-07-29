import {useState} from 'react';

export const useTheme = () => {
    
    // 브라우저 테마 정보 확인
    const initTheme = localStorage.getItem('theme');
    // default : light
    if (!initTheme) {
        localStorage.setItem('theme', 'light');
    }
    

    const [theme, setTheme] = useState(initTheme);

    const setMode = mode => {
        // 테마정보 변경하면 localstorage 에 저장해 다음에도 지정한 값으로 테마가 보이도록 설정
        window.localStorage.setItem('theme', mode)
        setTheme(mode)
    };

    const toggleTheme = () => {
        setMode(theme === 'light' ? 'dark' : 'light');
    }

    return [theme, toggleTheme];
}
export default useTheme;