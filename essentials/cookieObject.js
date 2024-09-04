export const cookieObject = {
    httpOnly: true,  // Makes cookie inaccessible to JavaScript
    secure: process.env.NODE_ENV === 'production',  // Use true for production with HTTPS
    sameSite: process.env.NODE_ENV === 'production'? 'None' : 'Lax',  // Adjust SameSite policy as needed
    path: '/'  // Cookie is available throughout the site
}

export const generateCookie = (maxAgeDays) => {
    const maxAgeMillis = maxAgeDays ? maxAgeDays * 24 * 60 * 60 * 1000 : null;
    
    return {
        ...cookieObject,
        ...(maxAgeMillis && { maxAge: maxAgeMillis })
    };
}