const urlInput = document.getElementById('youtube-url');
const convertBtn = document.getElementById('convert-btn');
const statusDiv = document.getElementById('status');

convertBtn.addEventListener('click', async () => {
    const url = urlInput.value.trim();
    
    if (!url) {
        showStatus('Please enter a YouTube URL', 'error');
        return;
    }
    
    if (!isValidYouTubeUrl(url)) {
        showStatus('Please enter a valid YouTube URL', 'error');
        return;
    }
    
    convertBtn.disabled = true;
    showStatus('Converting... This may take a minute', 'loading');
    
    try {
        const response = await fetch(`https://en.greenconvert.net/1YVJ/${url}`);
        
        if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'video.mp3';
            a.click();
            URL.revokeObjectURL(url);
            showStatus('Conversion successful!', 'success');
        } else {
            showStatus('Conversion failed. Please try again.', 'error');
        }
    } catch (error) {
        showStatus('Error: ' + error.message, 'error');
    } finally {
        convertBtn.disabled = false;
    }
});

urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        convertBtn.click();
    }
});

function isValidYouTubeUrl(url) {
    return /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)[^&\n?#]+/.test(url);
}

function showStatus(message, type) {
    statusDiv.textContent = '';
    statusDiv.innerHTML = message;
    statusDiv.className = `status ${type}`;
}
