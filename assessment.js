'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

assessmentButton.onclick = function() {
	const userName = userNameInput.value;
	if(userName.length === 0){
		return;
	}
	while(resultDivided.firstChild){
		resultDivided.removeChild(resultDivided.firstChild);
	}
	const header = document.createElement('h3');
	header.innerText = '診断結果';
	resultDivided.appendChild(header);
	const paragraph = document.createElement('p');
	const result = assessment(userName);
	paragraph.innerText = result;
	resultDivided.appendChild(paragraph);

	while(tweetDivided.firstChild){
		tweetDivided.removeChild(tweetDivided.firstChild);
	}
	const anchor = document.createElement('a');
	const hrefValue = 
		'https://twitter.com/intent/tweet?button_hashtag=' 
		+ encodeURIComponent('あなたの良いところ') 
		+ '&ref_src=twsrc%5Etfw';
	anchor.setAttribute('href', hrefValue);
	anchor.className = 'twitter-hashtag-button';
	anchor.setAttribute('data-text', result);
	anchor.innerText = 'Tweet #あなたの良いところ';
	tweetDivided.appendChild(anchor);
	const script = document.createElement('script');
	script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
	script.setAttribute('charset', 'utf-8');
	tweetDivided.appendChild(script);
}

userNameInput.onkeydown = event => {
	if(event.key === 'Enter'){
		assessmentButton.onclick();
	}
}

const answers = [
	'{userName}の良いところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
	'{userName}の良いところは眼差しです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
	'{userName}の良いところは情熱です。{userName}の情熱に周りの人は感化されます。',
	'{userName}の良いところは厳しさです。{userName}の厳しさが物事をいつも成功に導きます。',
	'{userName}の良いところは知識です。博識な{userName}を多くの人が頼りにしています。',
	'{userName}の良いところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
	'{userName}の良いところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
	'{userName}の良いところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
	'{userName}の良いところは決断力です。{userName}が下す決断にいつも助けられています。',
	'{userName}の良いところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒されています。'
];

function assessment(userName) {
	let sumOfCharCode = 0;
	for(var i = 0; i < userName.length; i++){
		sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
	}
	const index = sumOfCharCode % answers.length;
	let result = answers[index];
	result = result.replace(/\{userName\}/g, userName);
	return result;
}

console.assert(assessment('太郎')===assessment('太郎'),'結果が異なっています');
