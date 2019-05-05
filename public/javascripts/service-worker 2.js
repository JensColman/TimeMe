console.log('Service worker loaded');

self.addEventListener('push', (e) => {
    console.log('Push received', e);
    var title = 'Pushed';
    e.waitUntil(
        self.registration.showNotification(title, {
            body: 'Notified by TimeMe',
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARkSURBVGhD3dpnqBxVGIfxq8YWYsdEDXaxRyGCIoKoiYgFjCAYYsEOfhJFUBMIIliQ2PIliopBUbBhAUFFEQQbGDVoMMWGJrYPsWuM0fg8kAPD8M7uObsz9974h9+Hu+yeM7N75sw579yRDrIIf2NjD+vxArbHuM5xiE6gyVUY1zkT0YE3uQ3jOv+7EzoS0YE3uRjjPtdiNaITSH7E/ZiAzSJzEJ1I0m+onY83sRCTfGGsM8wJnY1/kd67DIdi1LMljsc8vIPqCdStwk04Edsg5SD8hPr7f8UZGJXsA7/xNagfSI4fcAeOxoebXovYfqfZEzmrgrZ8h06yBa6AM1XUcVcuR+vZAU8h6rBL96H17IFeYzziBb4c7+FjfI/ofb28herE0Up2x0pEHVY5Gz2K87AXouyM03EPck7QL8UJo7V4Y1uKqLPE62kudkRJtobLn88QtZs4E+6PVvIEok6S5zAFw8R90QJUb6h172MihsoliBqXnd8Kb6htxRXGn4j6k8N04HjdrEXUsC5DF3G18TuiPjfgWAyUexE1qtvRZc5F0/B7A8VxFfAXogY/gfWAO+H7usrNiPrXTBRlPqKG1sFJIP39G7yOnIrbzrb4AtX+E4+hKJ8jauhunALHcvV1p+0bMPQsVIv7omo/iVWjycjKdESN+Os4UZjTEK3lvoGVnLbu7M6gDvF6P7oUWbkOUQNPo5pDsALRez+F324bU/qNiPp4HFl5BlEDUUFjF7yM6P1yhXEBLoIX8iC/3FGI2vayyIqLyKiBgxFlK3htRZ+p8wSPQEncrkS72H+QVXn9A/UPO4X3q9A4pr3O6p+tc5FbOnm8i6itw9AzftvRBy1L5eQE5KygXVKV5HlE7Vh67pmdEH0we7wSawwfIGonuQUleQxROyejZ5p+oa9REpf6UTvJlShJ9WZe5bqvb6JryGujdAp+BfV25JfjSCiJRceorcPRNxb2og8fiJJ4J69fzF+i77gPEq36XbxmVVWfRf3D8n5SGn/VGbgGszFIWdeZLDqer5AV12RRA16YYxGL/9HxWH3KStNTODddpWO/jTRVmrKf/jlMvHCjRkqn22FzDqLjcJUwFdmxVh015K/U5aauGlcmTSttZ9Ci7Av3HFFjT2I00rTq11kozoOIGtP16DKnor6JTCxnuWAtjmP0F0SN2pnju4s4TTc9CPDecxIGztWIGpYn5f2lzTTthJNHMFT8aV9E1HjyMHwqMUzc+LkzbRpmcttRWmoOsxt8hBh1kvh0zWdGpTtSvzAL+/3ad4M3Da1lPzTdm6q+xV1wnG+HKK7oj4HPYpum5SoXxlaaWs8B6PdNVvmo0mHyOl7Cq/gIObva5Gf03fMME1fQryHqvG3+ev5nSudxaeQFHO2b2uDU/ABG/R8u3B9Z8moqqg/ibViXGNM4+zyEqNSUwyWWW+ziAnzXsUY2C/5/zhJYyI9OwJKYu+LFuBC7YrOJK3MLlE7TLmn2htN2RxkZ+Q/SzoSi3hNZIQAAAABJRU5ErkJggg==',
            tag: 'timer-message'
        })
    );
});
