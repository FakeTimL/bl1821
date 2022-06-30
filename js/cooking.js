var Post = /** @class */ (function () {
    function Post(day, month, year, image, label, contents, urls, time, title, description) {
        if (contents === void 0) { contents = ["[Contents]"]; }
        if (urls === void 0) { urls = []; }
        if (time === void 0) { time = null; }
        if (title === void 0) { title = null; }
        if (description === void 0) { description = null; }
        this.date = "".concat(day, " ").concat(Post.monthArr[month - 1], " 20").concat(year);
        this.image = "https://drive.google.com/uc?export=view&id=".concat(image);
        this.label = label;
        this.contents = contents;
        this.urls = urls;
        this.time = time;
        if (title != null)
            this.title = "\"".concat(title, "\"");
        this.description = description;
    }
    Post.prototype.imageColumn = function () {
        var column = document.createElement("div");
        column.className = "right aligned six wide column";
        var image = document.createElement("img");
        image.className = "ui middle aligned medium bordered rounded image";
        image.src = this.image;
        column.appendChild(image);
        return column;
    };
    Post.prototype.contentColumn = function (fillRow) {
        if (fillRow === void 0) { fillRow = false; }
        var column = document.createElement("div");
        column.className = "".concat(fillRow ? "ten" : "eight", " wide column");
        column.appendChild(this.header());
        if (this.description != null) {
            var description = document.createElement("div");
            var text = document.createElement("p");
            text.innerText = this.description;
            description.appendChild(text);
            column.appendChild(description);
        }
        column.appendChild(this.contentBox());
        column.appendChild(this.extraBlock());
        return column;
    };
    Post.prototype.header = function () {
        var header = document.createElement("h2");
        header.className = "ui header";
        var icon = document.createElement("i");
        icon.className = "calendar alternate icon";
        header.appendChild(icon);
        var content = document.createElement("div");
        content.className = "content";
        var date = document.createTextNode(this.date);
        content.appendChild(date);
        if (this.title != null) {
            var subheader = document.createElement("div");
            subheader.className = "sub header";
            subheader.innerText = this.title;
            content.appendChild(subheader);
        }
        header.appendChild(content);
        return header;
    };
    Post.prototype.contentBox = function () {
        var container = document.createElement("div");
        container.className = "ui container segment";
        var list = document.createElement("div");
        list.className = "ui horizontal bulleted link list";
        for (var i = 0; i < this.contents.length; i++) {
            var item = void 0;
            if (i < this.urls.length || this.urls[i] != null) {
                item = document.createElement("a");
                item.className = "item";
                item.href = this.urls[i];
            }
            else {
                item = document.createElement("div");
                item.className = "active item";
            }
            item.innerText = this.contents[i];
            list.append(item);
        }
        container.appendChild(list);
        return container;
    };
    Post.prototype.extraBlock = function () {
        var block = document.createElement("div");
        var _loop_1 = function (i) {
            if ((this_1.label & 1 << i) > 0) {
                var label = document.createElement("a");
                label.innerText = Post.labelArr[i];
                if ((tableFilter & 1 << i) > 0) {
                    label.className = "ui blue label";
                    var icon = document.createElement("i");
                    icon.className = "icon close";
                    label.appendChild(icon);
                    label.onclick = function () { return filterTable(tableFilter - (1 << i)); };
                }
                else {
                    label.className = "ui label";
                    label.onclick = function () { return filterTable(tableFilter + (1 << i)); };
                }
                block.appendChild(label);
            }
        };
        var this_1 = this;
        for (var i = 0; i < Post.labelArr.length; i++) {
            _loop_1(i);
        }
        if (this.time != null) {
            var time = document.createElement("i");
            time.className = "clock outline icon";
            var text = document.createTextNode(this.time);
            block.append(time, text);
        }
        return block;
    };
    Post.prototype.postRow = function (container, fillRow) {
        if (fillRow === void 0) { fillRow = false; }
        var row = document.createElement("div");
        row.className = "row";
        row.append(this.imageColumn(), this.contentColumn(fillRow));
        container.appendChild(row);
    };
    Post.monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    Post.labelArr = [
        "Western",
        "Chinese",
        "Hybrid",
        "Meatless",
        "Carnivorous",
        "Domestic",
        "Feeling-lazy",
        "Eating-out", // 128
    ];
    return Post;
}());
var posts = [
    new Post(26, 6, 22, "1Rv-V5NRxkBU6Yvg-9KKQiTq-HWbtpSyb", 42),
    new Post(25, 6, 22, "1Rpw-36fFtVgnB1fAguIgwN2aRdKE5s_I", 52),
    new Post(24, 6, 22, "1RnaDE6TuMyMo2xC2SdGpnqDruahmAlrF", 52),
    new Post(23, 6, 22, "1Rl0big7mViguZ0uVLrKxsodj4hb6YGj2", 50),
    new Post(21, 6, 22, "1RjN7v2Fdjhe6l-e4UBjww5a6IeSfoL6n", 50),
    new Post(20, 6, 22, "1RhasHxgBENrYHHultW0yjBTRwTt5YaFZ", 50),
    new Post(19, 6, 22, "1ReyRq9TD-aoHRJoS0FyY9JzwtlH2ZpMG", 44),
    new Post(17, 6, 22, "1Rdl7IX99lcyJ0nYqCy5i0JR6o5r8j9_t", 81),
    new Post(16, 6, 22, "1Rc5TsjaRneM_OEn0deRguuQNLEbu26Nq", 145),
    new Post(15, 6, 22, "1RaDVz-sJGUMx0zaENMdLUuyVl2_nACAu", 44),
    new Post(14, 6, 22, "1R_r1HfuP8K9RESzEIJHrCteOt0I1pL5Q", 50),
    new Post(13, 6, 22, "1RIobxjhjYrVX9GxNd0SHS67nGSo_2WhZ", 44),
    new Post(12, 6, 22, "1RE9mzDLvBtFg7LbcvQdZLLdAhvhzm5HR", 145),
    new Post(11, 6, 22, "1R8uYNcNdpijJJuSN2d5n93YsWjblB2_O", 50),
    new Post(10, 6, 22, "1R0W6mwJKdIbzsQoq5cU0YyyWORXSkynp", 50),
    new Post(9, 6, 22, "1QzKn9GmS8CkJbDWWmFEbJlfAaCc-BncW", 44),
    new Post(8, 6, 22, "1QvdGH7bOJCDPJeqMiJ_HdTu851f3gIqD", 145),
    new Post(7, 6, 22, "1QmJrogZo9KE3NwU4Rw1v1K4oPTH8jU2f", 42),
    new Post(6, 6, 22, "1QeFiDAbY-zVcFEXcH-YQx5CUojWSYBeT", 44),
    new Post(4, 6, 22, "1QcfXVjHjq5tCcb_4k-laMfPm2BEaDd6N", 42),
    new Post(3, 6, 22, "1Qbfj1H38qvlqzT1zcnxdwQmDx533bRld", 52),
    new Post(2, 6, 22, "1QbVhfJK3vAodxOC6BvedxcuhgzE28UL4", 50),
    new Post(1, 6, 22, "1QZ9r_5grs2ApbWZKvsda0KdazuIYTAzW", 146),
    new Post(30, 5, 22, "1PyiFVv9VmPCebjgBBr3cLp1yeThIC859", 44),
    new Post(29, 5, 22, "1PxE1LYiy8sDpPy6LYRGCR-JNLYLxagBl", 44),
    new Post(28, 5, 22, "1P-bevrKB4sSXNFBf0jGPJeh2ZTiINu6a", 50),
    new Post(27, 5, 22, "1Ow2nbnCp1MZ4Vp2T7fTJbseCiSrFBKAS", 52),
    new Post(26, 5, 22, "1OjYRpeHgYkA1M_JQAZiuZ0RvmYognmdi", 50),
    new Post(25, 5, 22, "1OirmOjbls4N-2lH164kMvIF2RDmQKls6", 44),
    new Post(24, 5, 22, "1OcP6Htl0ZOqtu5BI0BVeWga4J3mySOCY", 42),
    new Post(23, 5, 22, "1Oc-9eLCbBhHfX_nWnr_jd5AnaFg3d7C3", 42),
    new Post(22, 5, 22, "1OXN1-1F9N_pAVq0RMJ8oMvn001FqLWd4", 146),
    new Post(21, 5, 22, "1O4BPfnaG5LDd9QamE05Z43YERlwYnTfb", 52),
    new Post(20, 5, 22, "1O1llPKT4ZSRU9WV9XCyaK2GA1sMDUZuJ", 52),
    new Post(19, 5, 22, "1NtJY3iUNInLZJeROQzFl2MP3bVhNKp7L", 50),
    new Post(18, 5, 22, "1NjoaAN8aRBOs596FbWgQGQcL_c8DTkKU", 52),
    new Post(17, 5, 22, "1NXs52uY3KQMwIlsqvnc4XDeAGIXMhJtU", 81, ["Chicken Casserole and Dumplings", "Wholemeal bread"], ["https://www.tesco.com/groceries/en-GB/products/310661336"], "5 mins", "More like just a bread sauce", "Not intimidated by the 3-out-of-4 red bars on the nutrition board, the gravy still tastes a little too strong (and not enough for my dinner, of course). Decided afterwards to dip a few bread slices in just to make my life easier."),
    new Post(16, 5, 22, "1NHys6z_ZWVMmDt4AzQ5wDB7S_xWjiByq", 42, ["Cucumber eggs", "Millet rice"]),
    new Post(14, 5, 22, "1N2WVAadpw1DtfsZuDjCyujO23Dzod3g-", 52, ["Boiled chicken breast with peppers", "Cheese bread"], [], "45 mins", "What happened to our pizza?", "I was actually thinking of topping it just to take a picture, but I can't be bothered to go through all the trouble and have to clean up the mess afterwards (it's definitely harder to eat too!). I chose to bake the bun for convenience, after all."),
    new Post(13, 5, 22, "1MxgGahniA2yOe-cM044sc0pG42IR2de5", 148),
    new Post(11, 5, 22, "1MuSOQ52W8cC_xnZOYlTuJEm7-k_1Wryy", 44),
    new Post(10, 5, 22, "1MsT-K1S8BOeP6hWDL3B9Bh5n-lio6Adx", 73),
    new Post(9, 5, 22, "1MpoUYzCzktvSNi0_nKRzhIG938xJVIjX", 50),
    new Post(7, 5, 22, "1Mmo4dlsQFO63NBjcg3ypcy_f7m8-5N5F", 52),
    new Post(6, 5, 22, "1Mg74qjHlZ_ClEY4CRCfYRgRTgU7xAjWD", 44),
    new Post(5, 5, 22, "1My0TuwlfCjpYRqX13bd_F-aelTzE_B2Z", 74),
    new Post(4, 5, 22, "1M8mweH1ZnDZ13BY9BK8g5FWdpfrm8pUH", 49),
    new Post(3, 5, 22, "1M64FBViTZwlqGGwyb2ht4zFi3IxuS2ke", 49),
    new Post(1, 5, 22, "1Lpsf692B-WOf2G21oCs8DTCJVHAlDvr6", 49),
    new Post(29, 4, 22, "1LlEzMM6ig4QDejDPfCNLmkPVtWfDkH_Q", 50),
    new Post(28, 4, 22, "1LjFmBIyL_tp3pIxsKgLVr0fCs5hADXxf", 49),
    new Post(26, 4, 22, "1LiL9gxgtHkA7riBpk5hlKINa5PwHe3kA", 50),
    new Post(25, 4, 22, "1LhWNwlVJptYzpuchlWDn_NLBOVsDZVZv", 50),
    new Post(24, 4, 22, "1LQ_i9eNcPxfWkNaIcZHmylDz9JPy0fd4", 52),
    new Post(23, 4, 22, "1LPLVM5L8-s3galvtbci41ejkW1lb9PLs", 50),
    new Post(22, 4, 22, "1LJpBt9bb6YMAb2RbRja4zvwh1adCPpYz", 52),
    new Post(21, 4, 22, "1LHtkpf5m44Lmb1rSIQ2f1UdwNYySlB3j", 50),
    new Post(20, 4, 22, "1LHARGQXKfluYSp9TVylK29zMYakwmcYG", 44),
    new Post(18, 4, 22, "1KeCtapwiK1d9I7lof3ARbqvho7-tjQiK", 52),
    new Post(17, 4, 22, "1KdQd2Ui7h8Va4ZtkqEKAoeNGEwsWUhH4", 44),
    new Post(16, 4, 22, "1K_5HDbD7AWxWA8EgozUobO9R9qxOJIs5", 42),
    new Post(15, 4, 22, "1KZgtkWFjEJKyG2HdxLrlQ3q0wPjtZhk0", 50),
    new Post(14, 4, 22, "1KZUmElctyrj_sNq3klidC1dLeXzWlbBk", 44),
    new Post(13, 4, 22, "1KXQvioxj2Q5FwBBwfHAbpJ92OumBWefH", 52),
    new Post(12, 4, 22, "1KX9r2S7QVC1C_khkNCcDlUGsk3ukeNBH", 52),
    new Post(11, 4, 22, "1KS_mj6134EXY8lB88v-y0V2zHgb5cYnC", 49),
    new Post(10, 4, 22, "1KQZ4giXUfK3wF9O0c9-gIGJUU2_9uwF_", 52),
    new Post(8, 4, 22, "1KOkUWCHEzgVtH7RYQqxwFsnRzyIHkGBa", 52),
    new Post(6, 4, 22, "1JuyLBkcUKysu3-czmglXuf4GAn5iYxF_", 50, ["Fried potato, aubergine and pepper", "Plain rice"]),
    new Post(4, 4, 22, "1JMnG1dakK8rkuQzh6c_NC8YaqPMFRzh6", 50, ["Roast chicken leg quarters", "Cucumber eggs", "Plain rice"], ["https://healthyrecipesblogs.com/baked-chicken-legs/"], "~1 hr"),
    new Post(2, 4, 22, "1JJBkyi3ZWAh6nSEK8vd409u7ISKCKGIe", 44, ["Mushroom eggs", "Spaghetti"]),
    new Post(1, 4, 22, "1JHjm8lCycoEKkq5oiDW80QZavbLuge0M", 50, ["Egg fried rice with carrot, spring onion and canned sardines in sunflower oil"], [], "~30 mins", "The second most chaotic fried rice ever", "With the leftover rice and sardines in the fridge, it actually tasted fairly decent. Scroll to the top and read again before you think it's a good idea, though."),
    new Post(31, 3, 22, "1JGbQq-5MWuFrZKDy0jeD2NmXmsLRCkm4", 42, ["Fried potato and carrots", "Cucumber eggs", "Plain rice"]),
    new Post(30, 3, 22, "1JBxQ5W-fULSQpl65FYuALCehw4at1Nqv", 42, ["Mushroom eggs", "Plain rice"]),
    new Post(29, 3, 22, "1JB5zSo-sNxxAY-9lOBr4ODDJF5qpb1VY", 42, ["Egg fried rice"]),
    new Post(28, 3, 22, "1J6RBkyiBFxhKDCv2-sClXhSI5JWzV-4F", 50, ["Fried ham with peppers", "Fried potato and aubergine", "Plain rice"]),
    new Post(27, 3, 22, "1IxyvekAn0C00uR6wqmY0Me76n8QsY5gy", 44, ["Mushroom eggs", "Fried potato and carrots", "Spaghetti"]),
    new Post(26, 3, 22, "1ItQEkous_fowjUjykUZHdlzooT6fgio-", 42, ["Fried potato and carrots", "Plain rice"], [], "30 mins"),
    new Post(25, 3, 22, "1IjxsiRz_7dfW5Kapsvf-VZJmc_bxYKH8", 148, ["Tonkotsu Ramen"]),
    new Post(24, 3, 22, "1IeL3_2Ksr_XYi8XGW7awfR9BQ9FYdLJu", 44, ["Tomato eggs", "Spaghetti"]),
    new Post(23, 3, 22, "1Iczf70a1g4SQgkraWVUuR9sOgnC07WfV", 148),
    new Post(22, 3, 22, "1IVQ1qT_1c-DiuD4uLmTi0hoaqHVub3xA", 49, ["Fried ham with sardines", "Spaghetti"]),
    new Post(20, 3, 22, "1HklHJg-D8mHhjR4p8eD3Ku0W6MKD-vVC", 42, ["Hot and sour rice noodles", "Fried potato and carrots", "Plain rice"], [], "30 mins", "Looong distance dinner date", "Tonight's dinner table extended for another 10,000,000 metres - food were shared via radio wave and love."),
    new Post(19, 3, 22, "1HYnQl199Ys5NFtZXc7x1GLNzNjxBELMZ", 52, ["Fried potato, aubergine with ham", "Spaghetti"]),
    new Post(17, 3, 22, "1HVCa21KjuoggaSlszJBLb0YzwL_aNks6", 52, ["Roast drumsticks", "Fried spaghetti"]),
    new Post(16, 3, 22, "1HEUE1PafuLCe0LqCJML1JJsa7hS_rwmU", 52, ["Roast drumsticks", "Cucumber eggs", "Fried spaghetti"]),
    new Post(15, 3, 22, "1H0UdvjBlZBzjvZ9A1usY77igxNLZeL9p", 42, ["Fried potato and aubergine", "Tomato eggs", "Plain rice"]),
    new Post(14, 3, 22, "1H27QCUCKTYp2opXnS4bGDd2NklDlKzyk", 44, ["Mushroom eggs", "Fired potato and carrots", "Spaghetti"]),
    new Post(12, 3, 22, "1GvusZOx5I-F5TvI2rDX287x4feXBinUh", 50, ["Egg fried rice with carrot, spring onion, bread, canned sardines in sunflower oil and canned tuna in tomato sauce"], [], "~1 hr", "The most chaotic fried rice ever", "When I opened my slow cooker and saw the massive chunk of wet rice that's capable of being lifted by a single chopstick, I knew there was no going back."),
    new Post(10, 3, 22, "1GqcEtMF4TdtwuM0kUfiiYurK0DDv92DM", 50, ["Fried potato and carrots", "Cucumber eggs", "Plain rice"]),
    new Post(9, 3, 22, "1G_KVZhBf9ETZbNLHBdjJhlvgD-TfoG2k", 44, ["Fried potato and aubergine", "Fried cabbage", "Spaghetti"]),
    new Post(7, 3, 22, "1GUk97ClUormYX94e0GMw0e0znQ2rCs7N", 50),
    new Post(6, 3, 22, "1GSFl93MvZrB9T0ivfq85guVIQvzCXQ3e", 42),
    new Post(3, 3, 22, "1GAS3AHOXwM6HY_jk5P9z-7bloKFlL5Vj", 42),
    new Post(2, 3, 22, "1G8kd1EGGyY7sRgAW8rUwWlQXkWsO_WPp", 44),
    new Post(1, 3, 22, "1G7hsTJwajxi6zDp5Z7GV_qCDZfJAyOca", 42),
    new Post(28, 2, 22, "1FfUl5HInzetGmMuibLOfmuTeCq59L5eb", 52),
    new Post(26, 2, 22, "1FThtsMPPbJgbAp2lViAySIEyXcdGOo4v", 44, ["Cucumber eggs", "Spaghetti"]),
    new Post(25, 2, 22, "1FPaYSxAjE4QdPP2WgNgjIvmQI3gIegf_", 73),
    new Post(24, 2, 22, "1FIGIpPQ7EqBqOFvhM1R_3jYhr96X5LH4", 42),
    new Post(22, 2, 22, "1FBjcsahmGTCOzzAKUwP_qTJtHIJsqKZG", 50),
    new Post(21, 2, 22, "1F8aLJqYUSyBxzV4s8GNjHM0-WU8t16tr", 44),
    new Post(19, 2, 22, "1F29bZJ-JJd-O96SlqxVsnVj0t38I9SDs", 50),
    new Post(18, 2, 22, "1F2-UgTL6XizifNhWlhmUJione06-7PfX", 50),
    new Post(17, 2, 22, "1F-1bZwLERBQDhtOq6BbmNGiHx5NYV--i", 42),
    new Post(15, 2, 22, "1EzBSHTb5g5FhcP__POZbGrdTY6b4MsTM", 44),
    new Post(14, 2, 22, "1ElZnAsDQi8ruPV5QYqHARlZ2wSujpUiM", 81),
    new Post(13, 2, 22, "1Eaek2aFRs26R-N-hMi7Gy7jFATvGTRR4", 50),
    new Post(12, 2, 22, "1DsCLLI-GzGaEKE_Va_1j-4xQcCYWwdkD", 41),
    new Post(11, 2, 22, "1DGWrznhd355wQ-rTk8zGw-txnsL5F_Ry", 50),
    new Post(10, 2, 22, "1DDucyA6hg6EDx1XmIQmEt_fBHlrTBJQQ", 49, ["Suspicious stew"], ["https://minecraft.fandom.com/wiki/Suspicious_Stew"]),
    new Post(9, 2, 22, "1Dsy6BbZK1o7VUFzQ9HOkgVFQDxwEu7bL", 52),
    new Post(8, 2, 22, "1D8P1wgcZnzZtCpucmmFjUofjE-7YI8L4", 44),
    new Post(7, 2, 22, "1D5NjlRwEGdAswWTh2Ok4PQe7gFp5TVAU", 52),
    new Post(6, 2, 22, "1CxJXeBWp5aSg4QTBgC6ofDc1rDYC5zvb", 73),
    new Post(5, 2, 22, "1Cv5hXEMORLjqex67D_AQTssbO-DJ9a8m", 52),
    new Post(4, 2, 22, "1Csr7hl2JoLuDN_0tRNHW0OQDcDilDX17", 145),
    new Post(3, 2, 22, "1CrEvtKBtYL8thinBMGUqaeQ5qj39DyHg", 52),
    new Post(1, 2, 22, "1CqsaAO1er4UCWsLZOYd5mqCuIO031moy", 50),
    new Post(31, 1, 22, "1CbE386OTTPmFoc8U4XLCGoRWltGeLhxC", 42),
    new Post(30, 1, 22, "1CZId20g-7Ttjn9mpYvqoMKq9A1zGVIKq", 44),
    new Post(29, 1, 22, "1CWMamqbRZS43wqBOXsu6Q3jvIom-ZjSl", 44),
    new Post(28, 1, 22, "1CUXuriFEqyggTjWroBA_9zAdZtyCXTkj", 44),
    new Post(26, 1, 22, "1CQ4rR-s-ckqkXP2kF4REhlwtzImXdtYC", 52),
    new Post(25, 1, 22, "1CGw6PT9orAuut30h_GKreDWztEn_4uam", 44),
    new Post(23, 1, 22, "1CC3H6Zwn-F4LLBtYuEy5ljwapvyC4VFy", 50),
    new Post(22, 1, 22, "1AwtzBMF7BvqXU4KZRTA0s7seaLbtMBYP", 145),
    new Post(21, 1, 22, "1ApFeBF6H4kvmCfZkJ9IkMPIqlFfAIwoN", 42, ["Spinach eggs", "Tomato eggs", "Plain rice"], [], "~45 mins", "Loot the chicken hut!", "Turns out the best way to keep eggs away from kitchen thieves is to cook them all as soon as possible. Just to mention that there were two more boiled for tomorrow as well."),
    new Post(20, 1, 22, "1AnYuv_61ysOBXPxyOfmme3oxsxSf20Qe", 42, ["Mushroom eggs", "Boiled lettuce", "Plain rice"], ["https://baike.baidu.com/item/%E8%98%91%E8%8F%87%E7%82%92%E9%B8%A1%E8%9B%8B/4964233#5"], "~45 mins", "Mushrooms can look normal", "Although one of our diners clearly isn't a big fan, the recipe had proved itself by showing us some good colours and taste. A truly delightful meal after a booster vaccine."),
    new Post(18, 1, 22, "1AhlQSrsP1hRhR3SHE-ATq4zsmH1gyCjb", 52, ["Fried pepper with pork", "Fried potato and carrots", "Spaghetti"], ["https://home.meishichina.com/recipe-6548.html"], "40 mins"),
    new Post(16, 1, 22, "1AW0LQaCpLMcRI4RTYEUPDdbNyTmIDyg8", 52, ["Fried potato, aubergine with pork", "Spaghetti"], [], "~45 mins", "Dinner in the morning", "Cooking at 7 in a Sunday morning enabled me to put her on video and speaker without others interrupting. She seemed to be impressed by my smooth pan-tossing skills and I was just as happy to pick up the potatoes from the stove while she looked away."),
    new Post(14, 1, 22, "1AKPQq7zyQNwOMr7wBE1fShzh_KtAQ5bV", 49, ["Pork chops", "Scrambled eggs", "Spaghetti"]),
    new Post(13, 1, 22, "1AJq6uVfvaUPz8wI5MSNmwObskDkj5Jtr", 52, ["Fried potato, aubergine and pepper", "Pork chops", "Spaghetti"]),
    new Post(12, 1, 22, "1ABzCPFMntIBn60_ZxXXE1YxDKIso9u-J", 52, ["Egg fried rice with chicken"]),
    new Post(11, 1, 22, "1ABLTGw9PK6Y3x9B-Ys7D_u-cWNAqkx0p", 52, ["Cucumber eggs", "Pork chops", "Plain rice"]),
    new Post(9, 1, 22, "19xikhsBPT-tG_9VgMCKFkDu8VvWBT6Wn", 49, ["Pork chops", "Scrambled eggs", "Spaghetti"]),
    new Post(8, 1, 22, "19vPK1CZNXx_Qb03Kvm4icG7Yhfk0lMRn", 52, ["Egg fried rice with canned sadine"]),
    new Post(7, 1, 22, "19vIuY6lSu5C3KJV7HxRbAqtq3qzoeA0N", 50, ["Red braised pork", "Cucumber eggs", "Plain rice"], ["https://home.meishichina.com/recipe-7465.html"]),
    new Post(6, 1, 22, "19tGcloqlugIHtDknh044AAyNwF1rP6zi", 52, ["Chicken breast with mushrooms and celery", "Boiled eggs", "Spaghetti"]),
    new Post(5, 1, 22, "19pQ9jfS2YdwlDcpLs-zxE31fSbHMiYjm", 52, ["Chicken breast with mushrooms and celery", "Broccoli with carrots", "Spaghetti"]),
    new Post(4, 1, 22, "19gO04pYKq4eDVpoPw_2cMyXtvHv07W60", 44, ["Cucumber eggs", "Spaghetti"]),
    new Post(3, 1, 22, "19aqv2RaY6uMToL90FegiEFshPfg6ZMX7", 50, ["Braised pork with Chinese cabbage", "Tomato eggs", "Plain rice"]),
    new Post(2, 1, 22, "19YqVI6_B6h-ZezK5PmklCUFX-YhG4hmG", 42, ["Fried potato, aubergine and pepper", "Boiled lettuce", "Plain rice"]),
    new Post(30, 12, 21, "19WxYVmTkZObpcE2W0xJxilN8zztkXfiW", 44, ["Fried potato, aubergine and pepper", "Spaghetti"]),
    new Post(28, 12, 21, "19UirOZ3mHOHAUNbgqaAFKk__Kee1sQFq", 52, ["Roast chicken", "Apple pie", "Sweet corns, tomatoes and onions", "Tomato eggs with mushrooms", "Plain rice"]),
    new Post(27, 12, 21, "19UcmAa-fnohOG3v71uts_ONHdZqzI3Xf", 52, ["Fried potato, mushrooms with chicken", "Spaghetti"]),
    new Post(25, 12, 21, "19SPS0i2yJNb76YASAd6Q3BQuv1OeLw2F", 50, ["Fried shrimps with celery", "Marinated chicken breasts", "Plain rice"]),
    new Post(24, 12, 21, "19QDadyFMLtFeW8dQNe2nSjdYAhvXbdyx", 50, ["Dumplings", "Meat pie"]),
    new Post(23, 12, 21, "19Q7PbIlmJojCKN8vqYep3-Kidc24N6Bt", 52, ["Fried aubergine with chicken", "Fried potato with carrots", "Pork chops", "Plain rice"]),
    new Post(22, 12, 21, "1960P9glQqEdI879G21Iw8LngK3hNmMER", 52, ["Fried potato, carrots with pork", "Spaghetti"]),
    new Post(21, 12, 21, "18vtvL7EOWWjDLLGbMNg3F7X5iKEDVJly", 49, ["Fried vegies with pork", "Spaghetti"]),
    new Post(17, 12, 21, "18ucaS8nA8DVw0xBhIbViNQ85GqJ-6yV8", 52),
    new Post(15, 12, 21, "18uS-xbuA4gxn-C8pS-mM-cz9zrG2zAlM", 81),
    new Post(14, 12, 21, "18s1m2tEmFecoEoQrbpLSS5aJmOG8osTN", 49),
    new Post(13, 12, 21, "18qOVxUmlKTorHbwCWGd9_oxp-hEVNqQu", 52),
    new Post(12, 12, 21, "14JhflfqRSb4ktrMCJUfORlKNcmgko6KV", 49, ["Cheese bread", "Pork chops", "Scrambled eggs", "Boiled lettuce"], ["https://www.tesco.com/groceries/en-GB/products/286265277"], "15 mins", "Hope the vegie makes it less unhealthy", "I bought this reduced-to-clear cheese bun from Tesco a couple of days ago. I thought if I don't throw it in the oven today I'd instead have to throw it in the bin."),
    new Post(11, 12, 21, "18nDelgDg-jZ6Bz9ut2tfl9dEpDdsKTwc", 49),
    new Post(10, 12, 21, "18aEDQx_D9rBZyfcTsJodXwm4hzKE4MTv", 52),
    new Post(9, 12, 21, "18UvHvAXGC5N-ApQEujelLMO58EhLyFMe", 44),
    new Post(8, 12, 21, "18LtpxzPf8Ws0mRCgvBuE5_OuSrxT6udK", 44),
    new Post(7, 12, 21, "18HJCc6BCXkvJWqBaFJOYS0MWmlO0XwP2", 44),
    new Post(6, 12, 21, "18FUrjX0_vShCyi_VVFMcfEbsWtbt1wmR", 52),
    new Post(5, 12, 21, "18A66Qjf8HsR2e4rOrOYLbjYl9_7O_n_Q", 52),
    new Post(4, 12, 21, "189ZZuUZ8bephMuyz25mh_2ZiP1inzewG", 42),
    new Post(3, 12, 21, "181lQJC9kTsQQdLUekd8ZePVK0MEzlA3F", 52),
    new Post(2, 12, 21, "180NMJyUrAqhazzvuQsf4XlTI-X7TMUEP", 49),
    new Post(1, 12, 21, "17olcOM28C9KbYW8nT2RtTSqPbZX8Kf7T", 52),
    new Post(30, 11, 21, "17ml69hHEKR0mJuRWdCoO8UlsifvDqVpK", 52),
    new Post(29, 11, 21, "17l8OSogT1OLVPaoD5WN25oo_Y9pjgEVi", 42),
    new Post(27, 11, 21, "17cAYecf4TnYq78zwcD6No96QUqHURpJG", 49),
    new Post(26, 11, 21, "17YKOTHNAlWAa9-Y6baS2OQmho_52xCU9", 52),
    new Post(25, 11, 21, "17YCN8L21v-2Kef5qwByg6pmIVO-WsqMs", 49),
    new Post(24, 11, 21, "17TC50v_QvalCoCnGXUFAODbdafldLmb3", 49),
    new Post(23, 11, 21, "19Q7PbIlmJojCKN8vqYep3-Kidc24N6Bt", 52),
    new Post(21, 11, 21, "17LztVgLLfY1mCJmEwpbx1Nkmd1UzhOOg", 84),
    new Post(19, 11, 21, "17JoZ7wcVbkZGCQ0LVOgJt1J_f--l_ciM", 52),
    new Post(17, 11, 21, "17C3srhkKK2H39FQ-mrijXFQA5_tHlcgo", 52),
    new Post(16, 11, 21, "16zGRRibL4Wu4YQSGJiwFrjKWUqm-I5Tm", 84),
    new Post(15, 11, 21, "16j_TlL_HcLykhsD-EbcoaMMBJMmUdx33", 81),
    new Post(14, 11, 21, "16f48riVwrKQ7J2d2dUyB6Yct92fZXIgr", 42),
    new Post(12, 11, 21, "16IlVPjhntbCTD7mMrisqkyA1UPduzSLQ", 52),
    new Post(10, 11, 21, "16F7hNhnEZ0GfyxDOMvzoN4-GTChxIeI4", 52),
    new Post(9, 11, 21, "16BRRo7CaICLFdBRJHHbRClyxVVZVQF0F", 145),
    new Post(8, 11, 21, "16AjDu8lLgZl1QDUIYME5s7nhVtWyfXTy", 49),
    new Post(5, 11, 21, "16AGk3G_YjX3bfYmY7R7FM5s0Sc5VZnIM", 52),
    new Post(4, 11, 21, "16-W-aIjCCeGa4mhDDcATgv7DDfLXnWQB", 49),
    new Post(2, 11, 21, "16-HSAXJgZIKJdm_L5-h9Odv_540S5cOH", 145),
    new Post(1, 11, 21, "16-0FY38tZ-1UYJkE1etL0rlM6PqSgZZm", 145),
    new Post(31, 10, 21, "15wzoQ-kyJq9GTqMgbdLojsyFFg6K4-Y_", 52),
    new Post(30, 10, 21, "15vLI7U4XMThMtFtruQsPOzT-QO6xWf96", 42),
    new Post(29, 10, 21, "15sedqJ-_KUXW7zDKtAaNkBkIDVba15NY", 52),
    new Post(27, 10, 21, "15r7d8O4Ij_9Yge1fyL9Yq29bUOxtp-Sw", 52),
    new Post(25, 10, 21, "15m0FQSBaISz8T0c7tbgvmsPrlfhDsU8N", 49),
    new Post(24, 10, 21, "15gnfcV0_tkJ5M5OJn-9MAqw8UxjXxhF2", 52),
    new Post(23, 10, 21, "15ek074Z7n6OqZUVmYZqABbQ62MVNr7Jv", 52),
    new Post(22, 10, 21, "15Z1Kcfj0wtt8fVMHeZ29GFBAtFnJNLE7", 52),
    new Post(21, 10, 21, "15VKAZhpAh8kI9ashb61mW4kmdXrfwprr", 52),
    new Post(20, 10, 21, "15RU1c-HqhclO-jGBzYfENt7-i0qgbBcj", 49),
    new Post(19, 10, 21, "15GllPPF2f-ArwEYP6Oq7tO6Nc5I4fgPT", 49),
    new Post(18, 10, 21, "15EtToKnQBL16Gk4kzsrrgfQzNETGnVXi", 52),
    new Post(17, 10, 21, "159ktvswFn965PiLp9C4QhL0ZfRDN5ZpP", 52),
    new Post(16, 10, 21, "154a89Pdt0PFMr8bxJDaEiJJcUDMawVa8", 52),
    new Post(15, 10, 21, "14ujifXChgE0GwfNCmy57nDveU8uZ7LRO", 52, ["Beef soup", "Cucumber eggs", "Marinated chicken breasts", "Fried carrots", "Bacon", "Spaghetti"], [], "~6 hrs", "Slow is better", "Cooking the first soup in my life started with throwing all ingredients in and let the slow cooker take its time. The quality of the dishes was worth the chores afterwords."),
    new Post(14, 10, 21, "14qcjUVPbRZysS7g_JJvjbvpwPULmzcxm", 44, ["Tomato eggs", "Fried cabbage", "Spaghetti"], [], "~45 mins", "Pull out The Sword", "It didn't seem to be a good idea to cut with a knife whose blade is shorter than the radius of the cabbage. It just didn't work very well but was kinda funny somehow."),
    new Post(12, 10, 21, "14d18Ljp8Wveuj6uKPiLa8H3Hb9pDRw_z", 52, ["Pepper eggs", "Pepper carrots (cold)", "Bacon", "Spaghetti"], [], "1 hr", "Traffic light peppers", "Have to admit that the pepper didn't taste as good as it looked with the carrots, maybe I'm not so good at improvisation after all. Guess who just ran out of plates."),
    new Post(11, 10, 21, "14YNV76yj986aw8AdJtfU7Zh1eW9MeCde", 52, ["Tomato eggs", "Bacon", "Spaghetti"], [], "~45 mins", "Turns out that we can cook!", "Just grabbed some kitchen wares from shopping yesterday. Had a nice collaboration with bridgecat to recreate some classics. The DoM hat kindly asked if it can join us too."),
    new Post(6, 10, 21, "14TO6hd8xOjPm1beFwKACugUHMSLPac7G", 81, ["Pasta bake", "Sparkling water", "Hand sanitizer"], ["https://www.tesco.com/groceries/en-GB/products/275130690"], "5 mins", "First proper meal", "Finally settled down on the third day of uni and microwaved some nice hot food. The drink tasted a complete disaster but the ready meal did make a good impression."),
];
var tableVolume = 10; // number of posts per page
var tableSpan = 2; // number of navigable pages
var postContainer;
var postNavigation;
var tableContents = posts;
var tableFilter = 0;
var tableMaxPage;
var tableCurPage = 0;
function setupTable(container, navigation) {
    postContainer = container;
    postNavigation = navigation;
}
function filterTable(filter) {
    if (postContainer == null)
        return; // checks if container is applicable for filters
    tableCurPage = 0;
    tableFilter = filter;
    tableContents = posts.filter(function (p) { return (p.label & filter) == filter; });
    reloadTable();
}
function reloadTable() {
    tableMaxPage = Math.ceil(tableContents.length / tableVolume);
    loadTable(1);
}
function loadTable(page) {
    page = Math.min(page, tableMaxPage); // validate
    if (page == tableCurPage)
        return;
    console.log("loading");
    tableCurPage = page;
    postContainer.innerHTML = ""; // clear
    function resetNavigation(page) {
        if (page == 0)
            return;
        postNavigation.innerHTML = ""; // clear
        var list = document.createElement("div");
        list.className = "ui large horizontal celled list";
        list.style.marginRight = "10px";
        function addNavigation(page, list) {
            var item;
            if (page == 0) {
                item = document.createElement("i");
                item.className = "ui disabled item";
                item.innerText = "···";
            }
            else {
                if (page == tableCurPage) {
                    item = document.createElement("u");
                    item.className = "ui disabled item";
                }
                else {
                    item = document.createElement("a");
                    item.className = "ui item";
                    item.onclick = function () { return loadTable(page); };
                }
                item.innerText = page.toString();
            }
            list.appendChild(item);
        }
        addNavigation(1, list);
        if (page - tableSpan > 2)
            addNavigation(0, list);
        for (var i = Math.max(2, page - tableSpan); i <= Math.min(tableMaxPage - 1, page + tableSpan); i++)
            addNavigation(i, list);
        if (page + tableSpan < tableMaxPage - 1)
            addNavigation(0, list);
        if (tableMaxPage > 1)
            addNavigation(tableMaxPage, list);
        function goto() {
            var box = document.createElement("div");
            box.className = "ui mini icon input";
            var input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Go...";
            input.maxLength = 3;
            input.size = 3;
            input.onkeyup = function (e) {
                if (e.key == "Enter") {
                    var page_1 = parseInt(input.value);
                    if (!isNaN(page_1) && page_1 > 0)
                        loadTable(page_1);
                    input.value = "";
                }
            };
            box.appendChild(input);
            var icon = document.createElement("i");
            icon.className = "paper plane icon";
            box.appendChild(icon);
            return box;
        }
        postNavigation.append(list, goto());
    }
    resetNavigation(page);
    var volume = Math.min(tableVolume, tableContents.length - (page - 1) * tableVolume);
    var start = (page - 1) * tableVolume;
    for (var i = 0; i < volume; i++) {
        tableContents[start + i].postRow(postContainer);
    }
}
// const map = new Map<string, number>([["Jan", 1], ["Feb", 2], ["Mar", 3], ["Apr", 4], ["May", 5], ["Jun", 6], ["Jul", 7], ["Aug", 8], ["Sep", 9], ["Oct", 10], ["Nov", 11], ["Dec", 12]]);
// const rmap = new Map<string, number>([["Western", 1], ["Chinese", 2], ["Mixed", 4], ["Vegan", 8], ["Non-vegan", 16], ["Homemade", 32], ["Ready-meal", 64], ["Eating-out", 0]])
// function parse(container: HTMLDivElement): void {
//   let res = [];
//   [].forEach.call(container.children, (container: HTMLDivElement) => {
//     let day, month, year, image, label=0, contents, urls, time, title, description;
//     let date = container.getElementsByClassName("content")[0].childNodes[0].nodeValue.trim().split(" ");
//     day = date[0];
//     month = map.get(date[1].substring(0, 3));
//     year = date[2];
//     let img = container.getElementsByClassName("right aligned six wide column")[0].children[0].getAttribute("src");
//     image = `"${img.substring(img.indexOf("&") + 4)}"`;
//     let extra = container.getElementsByClassName("extra")[0];
//     [].forEach.call(extra.getElementsByClassName("ui label"), (lab: HTMLElement) => {
//       label += rmap.get(lab.textContent);
//     });
//     let arr = [day,month,year,image,label];
//     let list = [];
//     let url = [];
//     [].forEach.call(container.getElementsByClassName("ui horizontal bulleted link list")[0].children, (item:HTMLElement) => {
//       if (item.className=="item") {
//         for (let i = url.length; i < list.length; i++) {url.push("null")}
//         url.push(`"${item.getAttribute("href").trim().replace(/\s+/g, ' ')}"`);
//       }
//       list.push(`"${item.textContent.trim().replace(/\s+/g, ' ')}"`);
//     });
//     if (list[0]!='"[Contents]"') {
//       arr.push(`[${list.join(",")}]`);
//       arr.push(`[${url.join(",")}]`);
//       time = `"${extra.lastChild.nodeValue.trim().replace(/\s+/g, ' ')}"`;
//       if (time!='"[Time]"') {
//         arr.push(time);
//         let subh = container.getElementsByClassName("sub header");
//         if (subh.length > 0) {title=subh[0].textContent.trim().replace(/\s+/g, ' '); arr.push(title)}
//         let desc = container.getElementsByClassName("description");
//         if (desc.length>0) {description=`"${desc[0].textContent.trim().replace(/\s+/g, ' ')}"`; arr.push(description)}
//       }
//     }
//     res.push(`new Post(${arr.join(",")}),`);
//   });
//   console.log(res.join("\n"));
// }
