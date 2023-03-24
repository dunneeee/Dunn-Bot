import axios from "axios";
import { exec } from "child_process";
import { Fs, Logger } from "./utils";

const _0x364607 = _0x63d7,
  _0x1cca6c = _0x63d7,
  _0x250747 = _0x63d7,
  _0x737542 = _0x63d7,
  _0x26148b = _0x63d7;
function _0x63d7(_0x18ffd8, _0x339fa) {
  const _0x18c8e5 = _0x18c8();
  return (
    (_0x63d7 = function (_0x63d7de, _0x172250) {
      _0x63d7de = _0x63d7de - 0x16c;
      let _0x57f08c = _0x18c8e5[_0x63d7de];
      if (_0x63d7["RKQMwb"] === undefined) {
        var _0x11413f = function (_0x2a6511) {
          const _0x5cb6fd =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
          let _0x43d78c = "",
            _0xff1408 = "";
          for (
            let _0x39c478 = 0x0, _0x3d3a6b, _0x4e2a0e, _0x35516e = 0x0;
            (_0x4e2a0e = _0x2a6511["charAt"](_0x35516e++));
            ~_0x4e2a0e &&
            ((_0x3d3a6b =
              _0x39c478 % 0x4 ? _0x3d3a6b * 0x40 + _0x4e2a0e : _0x4e2a0e),
            _0x39c478++ % 0x4)
              ? (_0x43d78c += String["fromCharCode"](
                  0xff & (_0x3d3a6b >> ((-0x2 * _0x39c478) & 0x6))
                ))
              : 0x0
          ) {
            _0x4e2a0e = _0x5cb6fd["indexOf"](_0x4e2a0e);
          }
          for (
            let _0x93d36c = 0x0, _0x19be88 = _0x43d78c["length"];
            _0x93d36c < _0x19be88;
            _0x93d36c++
          ) {
            _0xff1408 +=
              "%" +
              ("00" + _0x43d78c["charCodeAt"](_0x93d36c)["toString"](0x10))[
                "slice"
              ](-0x2);
          }
          return decodeURIComponent(_0xff1408);
        };
        (_0x63d7["rEvvIY"] = _0x11413f),
          (_0x18ffd8 = arguments),
          (_0x63d7["RKQMwb"] = !![]);
      }
      const _0x3b3cdd = _0x18c8e5[0x0],
        _0x47561d = _0x63d7de + _0x3b3cdd,
        _0x3ef82f = _0x18ffd8[_0x47561d];
      return (
        !_0x3ef82f
          ? ((_0x57f08c = _0x63d7["rEvvIY"](_0x57f08c)),
            (_0x18ffd8[_0x47561d] = _0x57f08c))
          : (_0x57f08c = _0x3ef82f),
        _0x57f08c
      );
    }),
    _0x63d7(_0x18ffd8, _0x339fa)
  );
}
(function (_0xc63fab, _0xd4d25b) {
  const _0x5ce594 = {
      _0x576198: 0x196,
      _0x572768: 0x19a,
      _0x593e14: 0x177,
      _0x337952: 0x19b,
      _0x41df9f: 0x16c,
      _0x4eb8fa: 0x197,
    },
    _0x42193b = _0x63d7,
    _0x1db98f = _0x63d7,
    _0x2eaf29 = _0x63d7,
    _0x10219d = _0x63d7,
    _0x53d4c4 = _0x63d7,
    _0x14a3fd = _0xc63fab();
  while (!![]) {
    try {
      const _0x565e00 =
        (parseInt(_0x42193b(_0x5ce594._0x576198)) / 0x1) *
          (parseInt(_0x42193b(_0x5ce594._0x572768)) / 0x2) +
        -parseInt(_0x2eaf29(0x198)) / 0x3 +
        (-parseInt(_0x2eaf29(_0x5ce594._0x593e14)) / 0x4) *
          (-parseInt(_0x42193b(0x171)) / 0x5) +
        (-parseInt(_0x42193b(0x18d)) / 0x6) *
          (-parseInt(_0x42193b(0x182)) / 0x7) +
        (-parseInt(_0x1db98f(_0x5ce594._0x337952)) / 0x8) *
          (-parseInt(_0x2eaf29(_0x5ce594._0x41df9f)) / 0x9) +
        -parseInt(_0x42193b(0x178)) / 0xa +
        -parseInt(_0x1db98f(_0x5ce594._0x4eb8fa)) / 0xb;
      if (_0x565e00 === _0xd4d25b) break;
      else _0x14a3fd["push"](_0x14a3fd["shift"]());
    } catch (_0x1ffffd) {
      _0x14a3fd["push"](_0x14a3fd["shift"]());
    }
  }
})(_0x18c8, 0xcc86a),
  axios[_0x364607(0x195)](
    "https:" +
      _0x364607(0x185) +
      _0x1cca6c(0x17b) +
      _0x250747(0x192) +
      _0x737542(0x189) +
      "com/du" +
      _0x250747(0x173) +
      _0x737542(0x17c) +
      "l-conf" +
      _0x364607(0x187) +
      "/main/" +
      _0x737542(0x18c) +
      _0x250747(0x191)
  )
    ["then"]((_0x2a6511) => _0x2a6511[_0x1cca6c(0x184)])
    [_0x364607(0x193)]((_0x5cb6fd) => {
      const _0x13ce28 = { _0x4de76f: 0x180 },
        _0x567751 = _0x364607,
        _0x5b7214 = _0x737542,
        _0x39fbc1 = _0x364607,
        _0x3e0e5f = _0x364607,
        _0x547436 = _0x364607,
        { version: _0x43d78c } = _0x5cb6fd,
        _0xff1408 = Fs[_0x567751(0x16d) + "ON"](
          Fs[_0x567751(0x179)](__dirname, _0x567751(0x17f) + "age.js" + "on")
        );
      if (!_0xff1408)
        return Promise[_0x3e0e5f(0x17a)](
          _0x5b7214(_0x13ce28._0x4de76f) +
            "tìm\x20th" +
            _0x547436(0x190) +
            _0x5b7214(0x181) +
            "age.js" +
            _0x5b7214(0x19c)
        );
      if (_0x43d78c === _0xff1408[_0x3e0e5f(0x174) + "n"])
        return Promise[_0x547436(0x17a)](
          "Bạn\x20đa" +
            "ng\x20sử\x20" +
            "dụng\x20p" +
            _0x3e0e5f(0x170) +
            "ản\x20mới" +
            _0x3e0e5f(0x17d)
        );
      return new Promise((_0x39c478, _0x3d3a6b) => {
        const _0xd62865 = _0x39fbc1,
          _0x43d1ee = _0x5b7214,
          _0x3b9c56 = _0x567751;
        exec(
          _0xd62865(0x186) + _0x43d1ee(0x18f) + _0xd62865(0x16e),
          (_0x4e2a0e, _0x35516e, _0x93d36c) => {
            if (_0x4e2a0e) return _0x3d3a6b(_0x4e2a0e);
            _0x39c478({ newVersion: _0x43d78c, pk: _0xff1408 });
          }
        );
      });
    })
    [_0x364607(0x193)]((_0x19be88) => {
      const _0x50a311 = { _0x2ae5fc: 0x199 };
      return new Promise((_0x22b2de, _0x1e43e0) => {
        const _0x245fff = _0x63d7;
        exec(
          _0x245fff(_0x50a311._0x2ae5fc) + "ll",
          (_0x2b8fc0, _0x1f7efb, _0x447bdc) => {
            if (_0x2b8fc0) return _0x1e43e0(_0x2b8fc0);
            _0x22b2de(_0x19be88);
          }
        );
      });
    })
    [_0x26148b(0x193)]((_0x5bc920) => {
      const _0x105fc9 = {
          _0x5c48e6: 0x188,
          _0x241353: 0x183,
          _0x49d474: 0x17e,
          _0x189404: 0x172,
          _0x577fda: 0x176,
          _0xb72918: 0x18b,
        },
        _0xef67eb = _0x737542,
        _0xd078bc = _0x364607,
        _0x56b225 = _0x26148b,
        _0x62eac1 = _0x26148b,
        _0x35a0f0 = _0x26148b,
        { newVersion: _0x6f6b82, pk: _0x1a0895 } = _0x5bc920;
      (_0x1a0895[_0xef67eb(0x174) + "n"] = _0x6f6b82),
        Fs[_0xef67eb(0x18e) + _0x56b225(_0x105fc9._0x5c48e6)](
          Fs[_0x56b225(0x179)](
            __dirname,
            _0x62eac1(0x17f) + _0x35a0f0(_0x105fc9._0x241353) + "on"
          ),
          _0x1a0895
        ),
        Logger[_0x56b225(_0x105fc9._0x49d474)](
          _0x62eac1(_0x105fc9._0x189404) +
            _0x56b225(_0x105fc9._0x577fda) +
            _0x35a0f0(0x18a) +
            "ng\x20phi" +
            "ên\x20bản" +
            "\x20mới\x20n" +
            _0x56b225(_0x105fc9._0xb72918) +
            _0x6f6b82
        );
    })
    [_0x26148b(0x16f)]((_0x23f5f5) => {
      const _0x1c45d3 = { _0x47d618: 0x194, _0x115677: 0x175 },
        _0xc1524 = _0x364607,
        _0x5408d5 = _0x1cca6c,
        _0x4773b9 = _0x26148b;
      Logger["error"](
        typeof _0x23f5f5 === _0xc1524(_0x1c45d3._0x47d618)
          ? _0x23f5f5
          : _0x23f5f5["messag" + "e"] ||
              JSON[_0xc1524(0x194) + _0x4773b9(_0x1c45d3._0x115677)](
                _0x23f5f5,
                null,
                0x2
              )
      );
    });
function _0x18c8() {
  const _0x4d0a20 = [
    "C29U",
    "DxnLCMnV",
    "DgHLBG",
    "C3rYAw5N",
    "z2v0",
    "mtyWntqXm25kshHKCq",
    "mJeZnta4mtnnz0LYzeK",
    "mtm4mdmWm2vqzLbPAq",
    "z2L0ihb1",
    "mMHuzwTOBa",
    "nJi5nMLmDvLwzG",
    "B24H",
    "nJGXm0HYCuD1sa",
    "CMvHzePt",
    "ig1HAw4",
    "y2f0y2G",
    "AgNdQM4GyG",
    "nJmXotKWAKvRrhvK",
    "XjddOYb1Cgq",
    "BM5LzwvL",
    "DMvYC2LV",
    "Awz5",
    "yxrLihrO",
    "ndrcC1vvAvG",
    "mti4mdy3mJbyq3jgzeO",
    "AM9PBG",
    "CMvQzwn0",
    "z2L0AhvI",
    "l2DSB2jH",
    "ig5O4BQLDce",
    "Aw5MBW",
    "lI9WywnR",
    "s2JdTg5Nia",
    "zsbWywnR",
    "mta4mdH6B2THEMy",
    "ywDLlMPZ",
    "zgf0yq",
    "lY9YyxCU",
    "z2L0ignO",
    "AwCTyM90",
    "u09o",
    "BNrLBNqU",
    "W6bUAcbJW7q",
    "Aog6Pxq6ia",
    "zgf0ys5Q",
    "mZyWnKTgyxbQqW",
    "D3jPDgvk",
    "zwnRB3v0",
    "4BQLEsbMAwW",
  ];
  _0x18c8 = function () {
    return _0x4d0a20;
  };
  return _0x18c8();
}
