import React, { useState } from 'react';
import './PasswordGenerator.css'

const PasswordGenerator = () => {
    const [password, setPassword] = useState('')
    const [options, setOptions] = useState({
        length: 6,
        uppercaseLetters: false,
        numbers: false,
        specialChars: false
    })

    const handleGeneratePassword = (passwordLenght) => {
        if(passwordLenght < 6 || passwordLenght > 32) {
            setOptions({...options, length: 6})
            return;
        }

        let charset = 'abcdefghijklmnouprstuwyz';

        if(options.uppercaseLetters) charset += 'ABCDEFGHIJKLMNOUPRSTUWYZ';
        if(options.numbers) charset += '0123456789';
        if(options.specialChars) charset += '!@#$%&*.;[}-=+><?/:';

        let password = '';

        for (let i = 0, n = charset.length; i < options.length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }
        
        setPassword(password)
    }
    const handleCopyToClipboard = () => {
        if(password) {
            navigator.clipboard.writeText(password)
        }
    }

    return (
        <div className='passwordGenerator'>
            <h2 className='passwordGenerator__title'>Stwórz swoje bezpieczne hasło</h2>
            <button className='passwordGenerator__button' onClick={() => handleGeneratePassword(options.length)}>Generuj hasło</button>
            <div className='passwordGenerator__number-group'>
                <label>
                    Długość hasła
                    <input className='passwordGenerator__number' type='number' value={options.length} onChange={e => setOptions({...options, length: Number(e.target.value)})}/>
                </label>
                <small>Twoje hasło powinno zawierać się pomiędzy 6 a 32 znaki.</small>
            </div>
            <div className='passwordGenerator__checkbox-group'>
                <div className='passwordGenerator__checkbox'>
                    <p>Duże litery</p>
                    <input type='checkbox' checked={options.uppercaseLetters} onChange={() => setOptions({...options, uppercaseLetters: !options.uppercaseLetters})}/>
                </div>
                <div className='passwordGenerator__checkbox'>
                    <p>Liczby</p>
                    <input type='checkbox' checked={options.numbers} onChange={() => setOptions({...options, numbers: !options.numbers})}/>
                </div>
                <div className='passwordGenerator__checkbox'>
                    <p>Znaki specjalne</p>
                    <input type='checkbox' checked={options.specialChars} onChange={() => setOptions({...options, specialChars: !options.specialChars})}/>
                </div>
            </div>
            <small>By zwiększyć bezpieczeństwo twojego hasła użyj kilku z powyższych opcji</small>
            <div className='passwordGenerator__wrapper'>
                <input type='text' className='passwordGenerator__wrapper-password' value={password} readOnly/>
                <div className='passwordGenerator__wrapper-clipboard' onClick={handleCopyToClipboard}>
                    <span className="fas fa-print"></span>
                </div>
            </div>
            
        </div>
    )

}

export default PasswordGenerator;