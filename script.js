"use strict";

$(document).ready(function () {
    // РАНДОМНЕ РОЗСТАВЛЕННЯ ПАЗЛІВ
    function puzzleRandom() {
        for (let i = 100; i <= 116; i++) {
            let r = Math.round(Math.random() * 16)
            $(`#${i}`).css('order', `${r}`)
        }
    }
    puzzleRandom();

    let countDownID;
    let seconds = 0;
    let newSec;
    // Функція,якщо закінчився час, або ти неправильно склав пазл 
    function Stop() {
        // $('.modal').fadeIn(1000);    
        clearInterval(countDownID);
        $('.modal').removeClass('hide');
        $('#btnModalCheck').addClass('hide');
        $('.warning').text('It`s a pity, but you lost')
        $('#btnCheck').addClass('btn-block');
        $('#btnCheck').attr('disabled', 'disabled');
    }
    function countDown() {
        $('.min').text('00');
        seconds++;
        if ($('.sec').text() == '00') {
            newSec = 60 - seconds;
        }
        if ($('.sec').text() != '00') {
            newSec = $('.sec').text() - 1;

        }
        if (newSec < 10) {
            newSec = '0' + newSec;
        }
        if (newSec == 0) {
            Stop()
        }
        $('.sec').text(`${newSec}`);
    }

    // BUTTON START
    $('#btnStart').on('click', function () {
        $('#btnStart').addClass('btn-block');
        $('#btnStart').attr('disabled', 'disabled');
        $('#btnCheck').removeClass('btn-block');
        $('#btnCheck').removeAttr('disabled');
        countDownID = setInterval(countDown, 1000);

        $(".block").sortable({
            connectWith: ".block",
            containment: ".game-window"
        })
    })

    // BUTTON CHECK
    $('#btnCheck').on('click', function () {
        clearInterval(countDownID);
        $('.modal').removeClass('hide');
        $('.warning').text(`You still have time, you sure? 00:${newSec}`);
    })

    // BUTTON NEW GAME
    $('#btnNewGame').on('click', function () {
        location.reload();
    })

    // BUTTON CLOSE MODAL
    $('#btnClose').on('click', function () {
        $('.modal').addClass('hide');
        $('#btnModalCheck').removeClass('hide');
        if ($('.sec').text() != '00' && $('.warning').text() != 'It`s a pity, but you lost' && $('.warning').text() != 'Woohoo, well done, you did it!') {
            countDownID = setInterval(countDown, 1000);
        }
    })
    // BUTTON CHECK MODAL
    $('#btnModalCheck').on('click', function () {
        Stop();

        let count = 0;
        for (let i = 1; i <= 16; i++) {
            let mainId = 200 + i;
            let check = $(`#${mainId}`).attr('id') - $(`#${mainId} div:first`).attr('id');
            if (check == 200) { count++ }
        }
        if (count == 16) {
            $('.warning').text('Woohoo, well done, you did it!')
        }
        else {
            Stop();
        }

    })

})