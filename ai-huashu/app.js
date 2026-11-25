(function(){
  "use strict";

  var $ = function(sel, root){ return (root || document).querySelector(sel); };
  var $$ = function(sel, root){ return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var ICONS = {
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.7 1.8 1.8.7-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7z"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    archive: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8"/><path d="M10 12h4"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>',
    upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4m0 0L7 9m5-5l5 5"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36L21 8"/><path d="M21 3v5h-5"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>',
    file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h6"/></svg>',
    spinner: '<svg class="spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 3a9 9 0 1 0 9 9"/></svg>'
  };

  $$("[data-icon]").forEach(function(el){ el.innerHTML = ICONS[el.getAttribute("data-icon")] || ""; });

  var KB_STORE = "bsh_gold_kb_import_v1";
  var DRAFT_STORE = "bsh_gold_drafts_v1";

  var FALLBACK_KB = [
    {category:"费用类", q:"为什么物业费一次性收取半年或一年？", a:"由于大部分业主事务繁忙，按年/半年收取可减少缴费频次，物业也能将更多精力用于服务。具体以《物业服务合同》约定为准。"},
    {category:"费用类", q:"物业费从什么时候开始计算？", a:"按约定日期办理收楼手续的，从办理收楼手续之日起计算；未按期收楼的，以收楼通知书约定交房时间的次月起计算。"},
    {category:"费用类", q:"物业费包含哪些内容？", a:"包括物业人员工资社保、共用设施设备日常维护、清洁卫生、绿化养护、秩序维护、办公费用及相关保险等，具体以合同约定为准。"},
    {category:"费用类", q:"低层住户也要交电梯费吗？", a:"高层住宅电梯费用包含在物业服务费内，最低楼层住户也需缴纳；业主大会另有决议或另有约定的，从其约定。"},
    {category:"费用类", q:"已经购买车位为什么还要交停车费？", a:"严格来讲是场地管理服务费，用于车位清洁、照明、秩序维护和设施维护，具体标准以合同或公示为准。"},
    {category:"费用类", q:"业主不交物业费对我有影响吗？", a:"有影响。物业费是维持小区正常服务的资金基础，欠费会影响整体服务质量，也会影响已缴费业主的权益。"},
    {category:"费用类", q:"开发商承诺未兑现可以不交物业费吗？", a:"不可以。开发商问题与物业费是不同法律关系，物业可协助业主按投诉流程向开发商反映，但物业费仍需按约缴纳。"},
    {category:"服务类", q:"物业服务包括哪些内容？", a:"包括房屋共用部位维护、共用设施设备运行维护、环境卫生、绿化养护、秩序维护、交通与车辆管理、业主档案管理等。"},
    {category:"服务类", q:"物业客服部是做什么的？", a:"负责入住装修手续办理、来电来访受理、报修投诉跟踪、综合巡查、回访走访、档案管理等。"},
    {category:"服务类", q:"为什么打物业电话是400总部接？", a:"为提升服务质量，总部对物业服务中心客服电话进行了升级，业主遇到的问题同样会转达对应项目处理。"},
    {category:"服务类", q:"业主要求帮忙拿物品或送东西", a:"如工作人员在岗且时间允许可协助；如遇交接班等时段，可约好时间由工作人员联系业主协助。"},
    {category:"服务类", q:"需要录入新的车牌信息", a:"为规范车位管理，业主需携带车辆行驶证到物业服务中心登记，或把信息发给楼栋管家代为录入。"},
    {category:"报修工程类", q:"房屋漏水怎么报修？", a:"可先通过企微或电话联系管家报修，物业会登记工单并安排工程人员上门检查，处理完成后回访确认。"},
    {category:"报修工程类", q:"报修后多久能上门？", a:"紧急事项按应急流程立即处理；一般报修按工单时限安排，通常24小时内联系业主并上门检查，具体以现场情况为准。"},
    {category:"报修工程类", q:"电梯故障怎么办？", a:"发现电梯异常请立即联系物业或监控中心，物业会第一时间停梯排查并联系维保单位处理，同时张贴提示。"},
    {category:"报修工程类", q:"楼道灯不亮找谁？", a:"可直接联系管家或在企微报修，物业会登记并安排维修，公共区域设施一般24小时内安排处理。"},
    {category:"装修类", q:"装修需要办理哪些手续？", a:"到服务中心领取装修申请表，提交装修公司资质、设计图、装修方案等资料，经审批并缴纳装修押金后施工。"},
    {category:"装修类", q:"装修为什么要交装修保证金？", a:"根据《住宅室内装饰装修管理办法》及物业服务约定，收取保证金以约束装修行为、保障共用设施安全，验收合格后按约退还。"},
    {category:"装修类", q:"装修垃圾清运费怎么收？", a:"按市场调节价与业主协商确定，具体标准以物业公示或《装修管理服务协议》约定为准。"},
    {category:"装修类", q:"节假日或夜间可以装修吗？", a:"小区实行装修时间管理，法定节假日及夜间禁止产生噪音的施工作业，具体时间以小区装修管理规定为准。"},
    {category:"安全秩序类", q:"电动车可以上楼充电吗？", a:"不可以。严禁电动车及电池进电梯、上楼、入户或在楼道充电，请到指定充电点充电，保障公共安全。"},
    {category:"安全秩序类", q:"楼道堆放杂物怎么处理？", a:"楼道属于消防疏散通道，请勿堆放杂物。物业会张贴提示并协助清理，请业主配合保持通道畅通。"},
    {category:"安全秩序类", q:"小区安全有哪些措施？", a:"小区设有监控系统、24小时巡逻、门岗登记等防范措施，重点部位重点监控，并配套应急处理流程。"},
    {category:"安全秩序类", q:"访客怎么进入小区？", a:"访客可在门岗登记或由业主提前通知物业放行，车辆按临时车辆管理规定登记进入。"},
    {category:"合同与义务", q:"物业服务合同包括哪些内容？", a:"一般包括服务事项、服务质量、服务费用标准和收取办法、维修资金使用、服务用房管理、服务期限、服务交接等条款。"},
    {category:"合同与义务", q:"业主可以拒绝缴纳物业费吗？", a:"除合同或法律另有规定外，业主应按时缴纳物业费；对服务有异议可通过投诉、业主大会或法律途径解决，不能单方拒缴。"},
    {category:"常规咨询", q:"快递送到哪里？可以代收吗？", a:"快递柜或快递架可临时存放，贵重或大件物品建议与业主电话确认；物业对代收物品仅做登记保管，遗失需及时联系快递方。"},
    {category:"常规咨询", q:"邻居噪音扰民怎么办？", a:"可先联系管家协调，物业会安排上门沟通；如涉及夜间施工或持续噪音，可记录时间并反馈，物业联合社区处理。"},
    {category:"常规咨询", q:"门禁卡怎么办理？", a:"需核实业主身份，请携带房产证明到物业服务中心前台办理；租户可携带租赁合同和身份证办理。"},
    {category:"常规咨询", q:"维修资金如何使用？", a:"用于共用部位、共用设施设备保修期满后的大修、更新和改造，由物业提出预算，经业主委员会审定后按程序使用。"}
  ];

  var BUILTIN_KB = (function(){
    var merged = FALLBACK_KB.concat(window.BSH_KB_DATA && window.BSH_KB_DATA.length ? window.BSH_KB_DATA : []);
    var seen = {}, out = [];
    merged.forEach(function(e){
      var key = String(e.q || "") + String(e.a || "");
      if (!seen[key]){ seen[key] = 1; out.push(e); }
    });
    return out;
  })();

  var TOPIC_KEYWORDS = {
    fee: ["物业费","费用","收费","交钱","缴费","欠费","账单","停车费","车位","押金","保证金","维修资金"],
    repair: ["漏水","渗水","报修","维修","故障","师傅","上门","电梯","楼道灯","下水道","停水","停电","坏了"],
    life_noise: ["邻居","楼上","半夜","拖凳子","吵","扰民","声音","安静","孩子","脚步声","来回走"],
    construction_noise: ["施工","装修","打钻","电钻","敲墙","砸墙","切割","装修噪音"],
    equipment_noise: ["电梯运行","电梯噪音","水泵","设备噪音","风机","空调外机","变电房"],
    decoration: ["装修","施工","垃圾清运","敲墙","改造","设计图","押金"],
    parking: ["车位","停车","车库","车辆","车牌","临停"],
    security: ["电动车","充电","楼道","杂物","消防","监控","门禁","访客","安全","被盗"],
    service: ["快递","代收","客服","帮忙","拿东西","登记","400"],
    contract: ["物业合同","合同","开发商","业主大会","业委会","拒缴","保修","维修资金"],
    movein: ["收楼","入住","交房","收房","契税","协议","登记"],
    cleaning: ["清洁","卫生","垃圾","绿化","杂草","修剪"],
    house: ["房屋","飘窗","渗水","墙体","开裂","防水","阳台","窗户","外墙"]
  };

  function detectTopics(text){
    var t = String(text || "");
    var found = {};
    Object.keys(TOPIC_KEYWORDS).forEach(function(topic){
      TOPIC_KEYWORDS[topic].forEach(function(kw){
        if (t.indexOf(kw) >= 0) found[topic] = true;
      });
    });
    return Object.keys(found);
  }

  var TONE_OPEN = {
    "正式规范": ["您好，关于您反馈的问题，我们非常重视。", "您好，您反映的情况我们已经收到，物业服务中心高度重视。"],
    "温和安抚": ["您好，非常理解您的心情，感谢您及时告诉我们，我们会尽快处理。", "您好，给您添麻烦了，我们特别理解，请您放心，我们会跟进到底。"],
    "简洁高效": ["您好，您的问题已收到，说明如下：", "您好，情况已登记，处理安排如下："]
  };
  var SCENARIO_MAP = {
    "通用咨询": {
      naturalDefault: "我们会先为您确认具体情况，再按物业口径给您明确答复。",
      closing: "如您还有其他疑问，欢迎随时联系我们。"
    },
    "投诉安抚": {
      naturalDefault: "我们会认真记录您的诉求，安排管家回访，并持续跟进处理结果。",
      closing: "我们会持续跟进处理结果，直到您满意为止。"
    },
    "报修跟进": {
      naturalDefault: "我们会尽快安排师傅与您联系，确认上门时间，处理完成后也会向您回访确认。",
      closing: "师傅上门前会提前联系您，请您保持电话畅通。"
    },
    "费用说明": {
      naturalDefault: "我们可以为您说明费用构成和收取依据，并协助核对账单明细。",
      closing: "如对账单有疑问，可联系财务或管家核对明细。"
    }
  };
  var POINT_RULES = [
    {keys:["安抚","共情","理解","重视"], text:"我们非常理解您的心情，会认真对待您的反馈。"},
    {keys:["上门","师傅","维修","检查","处理现场"], text:"我们会安排专业人员尽快与您联系，并上门处理。"},
    {keys:["时限","时间","回访","承诺"], text:"处理进展我们会在约定时间内及时同步给您。"},
    {keys:["流程","手续","材料","资料","办理"], text:"我们会为您说明办理流程和所需材料。"},
    {keys:["联系","管家","电话","联系方式"], text:"您也可以随时联系您的楼栋管家，我们会及时响应。"},
    {keys:["登记","记录","工单"], text:"您反馈的信息我们已经详细记录。"},
    {keys:["账单","明细","费用","核对"], text:"我们会协助您核对相关费用和账单明细。"},
    {keys:["社区","联合","协调"], text:"必要时我们会联合社区共同协调处理。"},
    {keys:["歉意","道歉","抱歉"], text:"给您带来不便，我们深表歉意。"}
  ];

  function load(key, fallback){
    try{
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    }catch(e){ return fallback; }
  }
  function store(key, value){
    try{ localStorage.setItem(key, JSON.stringify(value)); }catch(e){}
  }

  var importedKB = load(KB_STORE, []);
  var drafts = load(DRAFT_STORE, []);
  var currentDraftId = null;
  var currentFiles = [];
  var currentSources = [];
  var generated = false;
  var scenario = "通用咨询";
  var tone = "正式规范";
  var toastTimer = null;
  var serverKB = null;
  var serverKBCategories = [];
  var kbManageMode = false;
  var kbExpanded = {};
  var HAS_API = (location.protocol === "http:" || location.protocol === "https:");

  var qInput = $("#question");
  var pointsInput = $("#points");
  var resultText = $("#resultText");
  var fileInput = $("#fileInput");
  var dropzone = $("#dropzone");
  var fileList = $("#fileList");
  var generateBtn = $("#generateBtn");
  var copyBtn = $("#copyBtn");
  var saveDraftBtn = $("#saveDraftBtn");
  var regenerateBtn = $("#regenerateBtn");
  var clearBtn = $("#clearBtn");
  var resultStatus = $("#resultStatus");
  var resultMeta = $("#resultMeta");
  var sourcesBody = $("#sourcesBody");
  var kbSearch = $("#kbSearch");
  var kbList = $("#kbList");
  var kbTotal = $("#kbTotal");
  var kbImportText = $("#kbImportText");
  var draftList = $("#draftList");
  var mobileGenerateBtn = $("#mobileGenerateBtn");
  var mobileCopyBtn = $("#mobileCopyBtn");
  var mobileSaveBtn = $("#mobileSaveBtn");
  var toastEl = $("#toast");

  function allKb(){
    if (serverKB && serverKB.length) return serverKB;
    return BUILTIN_KB.concat(importedKB);
  }

  function esc(s){
    return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];
    });
  }

  function toast(msg, type){
    toastEl.textContent = msg;
    toastEl.className = "toast show" + (type ? " " + type : "");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ toastEl.className = "toast"; }, 2400);
  }

  function formatTime(ts){
    var d = new Date(ts);
    function p(n){ return n < 10 ? "0" + n : "" + n; }
    return d.getFullYear() + "-" + p(d.getMonth()+1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
  }

  function formatSize(n){
    if (!n) return "";
    if (n < 1024) return n + " B";
    if (n < 1024*1024) return (n/1024).toFixed(1) + " KB";
    return (n/1024/1024).toFixed(1) + " MB";
  }

  function truncate(s, n){
    s = String(s || "");
    return s.length > n ? s.slice(0, n) + "……" : s;
  }

  function refreshCounts(){
    $("#draftCount").textContent = drafts.length;
    $("#draftCountFooter").textContent = drafts.length;
    $("#kbCount").textContent = allKb().length;
  }

  function setResultButtons(){
    var has = resultText.value.trim().length > 0;
    copyBtn.disabled = !has;
    saveDraftBtn.disabled = !has;
    regenerateBtn.disabled = !has;
    if (mobileCopyBtn) mobileCopyBtn.disabled = !has;
    if (mobileSaveBtn) mobileSaveBtn.disabled = !has;
  }

  function readFileText(file){
    return new Promise(function(resolve){
      var reader = new FileReader();
      reader.onload = function(){ resolve(String(reader.result || "")); };
      reader.onerror = function(){ resolve(""); };
      reader.readAsText(file, "utf-8");
    });
  }

  function renderFiles(){
    fileList.innerHTML = currentFiles.map(function(f, i){
      var meta = f.text ? formatSize(f.size) : (formatSize(f.size) || "已记录文件名");
      return '<li class="file-item">' +
        '<span class="file-icon" data-icon="file"></span>' +
        '<span class="file-name" title="' + esc(f.name) + '">' + esc(f.name) + '</span>' +
        '<span class="file-meta">' + esc(meta) + '</span>' +
        '<button type="button" data-remove="' + i + '" title="移除"><span data-icon="x"></span></button>' +
      '</li>';
    }).join("");
    $$("[data-icon]", fileList).forEach(function(el){ el.innerHTML = ICONS[el.getAttribute("data-icon")] || ""; });
  }

  function handleFiles(fileListInput){
    var files = Array.prototype.slice.call(fileListInput);
    Promise.all(files.map(function(file){
      var item = {name: file.name, size: file.size, type: file.type || "", text: ""};
      if (/\.(txt|md|csv)$/i.test(file.name)) return readFileText(file).then(function(text){ item.text = text; return item; });
      return Promise.resolve(item);
    })).then(function(items){
      items.forEach(function(item){
        var dup = currentFiles.some(function(f){ return f.name === item.name && f.size === item.size; });
        if (!dup) currentFiles.push(item);
      });
      renderFiles();
    });
  }

  dropzone.addEventListener("click", function(){ fileInput.click(); });
  fileInput.addEventListener("change", function(){ handleFiles(fileInput.files); fileInput.value = ""; });
  ["dragover", "dragenter"].forEach(function(ev){
    dropzone.addEventListener(ev, function(e){ e.preventDefault(); dropzone.classList.add("drag"); });
  });
  ["dragleave", "drop"].forEach(function(ev){
    dropzone.addEventListener(ev, function(e){ e.preventDefault(); dropzone.classList.remove("drag"); });
  });
  dropzone.addEventListener("drop", function(e){ handleFiles(e.dataTransfer.files); });
  fileList.addEventListener("click", function(e){
    var btn = e.target.closest("button[data-remove]");
    if (!btn) return;
    currentFiles.splice(Number(btn.getAttribute("data-remove")), 1);
    renderFiles();
  });

  function bindSegmented(groupId, cb){
    $$("#" + groupId + " button").forEach(function(btn){
      btn.addEventListener("click", function(){
        $$("#" + groupId + " button").forEach(function(b){ b.classList.remove("active"); });
        btn.classList.add("active");
        cb(btn.getAttribute("data-value"));
      });
    });
  }
  bindSegmented("scenarioGroup", function(v){ scenario = v; });
  bindSegmented("toneGroup", function(v){ tone = v; });

  $$("#pointChips .chip").forEach(function(chip){
    chip.addEventListener("click", function(){
      var current = pointsInput.value.trim();
      var text = chip.getAttribute("data-point");
      var lines = current ? current.split(/\r?\n/).map(function(s){ return s.trim(); }) : [];
      if (lines.indexOf(text) >= 0){
        toast("该要点已添加，请勿重复", "error");
        return;
      }
      pointsInput.value = current ? current + "\n" + text : text;
      pointsInput.focus();
    });
  });

  qInput.addEventListener("input", function(){ $("#questionCount").textContent = qInput.value.length + " 字"; });
  resultText.addEventListener("input", function(){
    if (resultText.value.trim()) resultStatus.textContent = generated ? "已编辑" : "未生成";
    setResultButtons();
  });

  function parsePoints(){
    var raw = pointsInput.value.trim();
    if (!raw) return [];
    return raw.split(/\n|；|;|、/).map(function(s){ return s.trim(); }).filter(Boolean);
  }

  function collectRefs(){
    var textParts = currentFiles.filter(function(f){ return f.text; }).map(function(f){ return f.text; }).join("\n").slice(0, 30000);
    var names = currentFiles.map(function(f){ return f.name; }).join("、");
    return {textParts: textParts, names: names};
  }

  function bigrams(text){
    var clean = String(text || "").replace(/[\s，。！？、；：""''（）【】]/g, "");
    var set = {};
    for (var i = 0; i < clean.length - 1; i++) set[clean.slice(i, i+2)] = true;
    return Object.keys(set);
  }

  function normalize(s){
    return String(s || "").replace(/[\s，。！？、；：""''（）【】\n]/g, "");
  }

    var STOP_BIGRAMS = {};
  ["的了","吗？","么？","什么","怎么","么办","我们","可以","能不","一下","一个","这个","那个","是否","请问","您好","问题","相关","时候","么时","候开","就是","还是","没有","不是","为什"].forEach(function(g){ STOP_BIGRAMS[g] = true; });

  function findCurated(q){
    for (var i = 0; i < FALLBACK_KB.length; i++){
      if (FALLBACK_KB[i].q === q) return FALLBACK_KB[i];
    }
    return null;
  }

  function seedKnowledge(question){
    var out = [];
    if (/物业费|物管费|管理费/.test(question) && /开始|计算|时候|从.*算/.test(question) && /入住|交房|收房|收楼|没入住|没住/.test(question)){
      var e = findCurated("物业费从什么时候开始计算？");
      if (e) out.push(e);
    }
    if (/漏水|渗水|滴水/.test(question) && /师傅|上门|修|报修|怎么办|处理/.test(question)){
      var e2 = findCurated("房屋漏水怎么报修？");
      if (e2) out.push(e2);
    }
    if (/装修|施工/.test(question) && /手续|流程|材料|申请|押金/.test(question)){
      var e3 = findCurated("装修需要办理哪些手续？");
      if (e3) out.push(e3);
    }
    if (/车位|停车/.test(question) && /交钱|收费|费用|为什么/.test(question)){
      var e4 = findCurated("已经购买车位为什么还要交停车费？");
      if (e4) out.push(e4);
    }
    return out;
  }

  function rankEntry(question, entry){
    var qClean = normalize(question);
    var kbQ = normalize(entry.q);
    var kbText = normalize(entry.q + entry.a);
    var qTopics = detectTopics(question);
    var eTopics = detectTopics(entry.q + entry.a);
    var topicHits = qTopics.filter(function(t){ return eTopics.indexOf(t) >= 0; });
    var score = 0;
    topicHits.forEach(function(t){ score += 5; });

    var kwHits = [];
    qTopics.forEach(function(t){
      TOPIC_KEYWORDS[t].forEach(function(kw){
        if (question.indexOf(kw) >= 0 && entry.q.indexOf(kw) >= 0 && kwHits.indexOf(kw) < 0) kwHits.push(kw);
      });
    });
    score += kwHits.length * 8;

    var containment = false;
    if (qClean.length >= 4 && kbQ.indexOf(qClean) >= 0){ score += 20; containment = true; }
    if (kbQ.length >= 4 && qClean.indexOf(kbQ) >= 0){ score += 16; containment = true; }

    var matchedBigrams = 0;
    bigrams(question).forEach(function(g){
      if (!STOP_BIGRAMS[g] && kbQ.indexOf(g) >= 0) matchedBigrams += 1;
    });
    score += Math.min(10, matchedBigrams * 3);

    if (scenario === "报修跟进" && topicHits.indexOf("repair") >= 0) score += 3;
    if (scenario === "费用说明" && topicHits.indexOf("fee") >= 0) score += 3;
    if (scenario === "投诉安抚" && topicHits.indexOf("life_noise") >= 0) score += 3;

    var strong = containment || kwHits.length >= 2 || matchedBigrams >= 3 || (topicHits.length > 0 && matchedBigrams >= 2);
    var medium = topicHits.length > 0 && (kwHits.length >= 1 || matchedBigrams >= 1 || score >= 10);
    var confidence = strong ? "high" : (medium ? "medium" : "low");
    return {score: score, confidence: confidence, topics: topicHits};
  }

  function retrieveKnowledge(question, topN){
    var seeds = seedKnowledge(question);
    var ranked = allKb()
      .map(function(entry){ return {entry: entry, rank: rankEntry(question, entry)}; })
      .filter(function(x){ return x.rank.confidence === "high"; })
      .sort(function(a, b){ return b.rank.score - a.rank.score; })
      .map(function(x){ return x.entry; });
    var merged = [], seen = {};
    seeds.concat(ranked).forEach(function(e){
      var key = normalize(e.q);
      if (!seen[key]){ seen[key] = 1; merged.push(e); }
    });
    return merged.slice(0, topN);
  }

  function retrieveCandidates(question, topN){
    var seeds = seedKnowledge(question);
    var ranked = allKb()
      .map(function(entry){ return {entry: entry, rank: rankEntry(question, entry)}; })
      .sort(function(a, b){ return b.rank.score - a.rank.score; })
      .map(function(x){ return {category: x.entry.category, q: x.entry.q, a: x.entry.a, score: x.rank.score, confidence: x.rank.confidence, topics: x.rank.topics}; });
    var merged = [], seen = {};
    seeds.forEach(function(e){
      var key = normalize(e.q);
      if (!seen[key]){ seen[key] = 1; merged.push({category: e.category, q: e.q, a: e.a, score: 999, confidence: "high", topics: []}); }
    });
    ranked.forEach(function(e){
      var key = normalize(e.q);
      if (!seen[key]){ seen[key] = 1; merged.push(e); }
    });
    return merged.slice(0, topN);
  }

  function scoreText(question, text){
    var score = 0;
    bigrams(question).forEach(function(g){ if (text.indexOf(g) >= 0) score += 1; });
    detectTopics(question).forEach(function(t){
      TOPIC_KEYWORDS[t].forEach(function(kw){ if (text.indexOf(kw) >= 0) score += 4; });
    });
    return score;
  }

  function fileRelevantSnippet(text, question){
    var lines = String(text || "").split(/\r?\n/).map(function(s){ return s.trim(); }).filter(function(s){ return s.length >= 4; });
    var best = null, bestScore = 0;
    lines.forEach(function(line){
      var s = scoreText(question, line);
      if (s > bestScore){ bestScore = s; best = line; }
    });
    return best;
  }

  function naturalizePoints(points){
    var texts = [];
    (points || []).forEach(function(p){
      POINT_RULES.forEach(function(rule){
        var hit = rule.keys.some(function(k){ return p.indexOf(k) >= 0; });
        if (hit && texts.indexOf(rule.text) < 0) texts.push(rule.text);
      });
    });
    return texts;
  }

  function buildReply(opts){
    var openPool = TONE_OPEN[opts.tone] || TONE_OPEN["正式规范"];
    var sc = SCENARIO_MAP[opts.scenario] || SCENARIO_MAP["通用咨询"];
    var variant = Math.floor(Math.random() * openPool.length);
    var lines = [];
    lines.push(openPool[variant]);
    lines.push("");
    if (opts.hits && opts.hits.length){
      var hit = opts.hits[0];
      lines.push("关于您反馈的问题，我们为您说明：" + truncate(hit.a, 320));
    } else if (opts.fileSnippet){
      lines.push("根据您上传的资料：" + truncate(opts.fileSnippet, 320));
    } else {
      lines.push("您反映的情况我们已经详细记录，会尽快安排对应人员核实，并第一时间向您反馈。");
    }
    var naturals = naturalizePoints(opts.points);
    if (!naturals.length) naturals = [sc.naturalDefault];
    lines.push("");
    lines.push(naturals.join(" "));
    lines.push("");
    lines.push(sc.closing);
    return lines.join("\n");
  }

  function updateResultMeta(sources, engine){
    var engineText = generated ? (engine || "本地模拟") : "未启动";
    resultMeta.innerHTML =
      '<span class="meta-chip">场景：' + esc(scenario) + '</span>' +
      '<span class="meta-chip">风格：' + esc(tone) + '</span>' +
      '<span class="meta-chip">知识库：命中 ' + sources.length + ' 条</span>' +
      '<span class="meta-chip">引擎：' + esc(engineText) + '</span>';
  }

  function renderSources(sources){
    if (!sources || !sources.length){
      sourcesBody.innerHTML = '<span class="empty-text">' + (generated ? "未匹配到知识库条目，已按通用口径生成" : "生成后展示命中的知识条目") + '</span>';
      return;
    }
    sourcesBody.innerHTML = sources.map(function(s){
      return '<div class="source-card">' +
        '<div class="src-cat">' + esc(s.category || "") + (s.confidence ? ' · ' + esc(s.confidence) : '') + '</div>' +
        '<div class="src-q">' + esc(s.q) + '</div>' +
        '<div class="src-a">' + esc(truncate(s.a, 180)) + '</div>' +
      '</div>';
    }).join("");
  }

  function setLoading(on){
    generateBtn.disabled = on;
    generateBtn.innerHTML = on
      ? '<span data-icon="spinner"></span>生成中…'
      : '<span data-icon="spark"></span>生成话术';
    $$("[data-icon]", generateBtn).forEach(function(el){ el.innerHTML = ICONS[el.getAttribute("data-icon")] || ""; });
  }

  var API_ENDPOINT = (location.protocol === "http:" || location.protocol === "https:") ? "/api/generate" : null;
  var API_TIMEOUT = 45000;

  function callGenerateApi(payload){
    if (!API_ENDPOINT) return Promise.reject(new Error("no-api"));
    var controller = new AbortController();
    var timer = setTimeout(function(){ controller.abort(); }, API_TIMEOUT);
    return fetch(API_ENDPOINT, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload),
      signal: controller.signal
    }).then(function(res){
      clearTimeout(timer);
      if (!res.ok) throw new Error("http-" + res.status);
      return res.json();
    }).catch(function(err){
      clearTimeout(timer);
      throw err;
    });
  }

  function generate(){
    var question = qInput.value.trim();
    if (!question){
      toast("请先输入业主问题", "error");
      qInput.focus();
      return;
    }
    var points = parsePoints();
    var hits = retrieveKnowledge(question, 3);
    var candidates = retrieveCandidates(question, 5);
    var refs = collectRefs();
    var fileSnippet = refs.textParts ? fileRelevantSnippet(refs.textParts, question) : "";
    var payload = {
      question: question,
      replyPoints: pointsInput.value.trim(),
      scenario: scenario,
      tone: tone,
      files: currentFiles.map(function(f){ return {name: f.name, text: f.text || ""}; }),
      knowledge: hits.map(function(h){ return {category: h.category, q: h.q, a: h.a}; }),
      candidates: candidates
    };
    setLoading(true);
    resultStatus.textContent = "正在生成…";
    callGenerateApi(payload).then(function(data){
      if (!data || !data.result || !String(data.result).trim()) throw new Error("empty-result");
      resultText.value = String(data.result).trim();
            var rawSources = (data.sources && data.sources.length) ? data.sources : candidates;
      currentSources = rawSources.filter(function(s){
        return s.confidence === "high" || (s.confidence === "medium" && Number(s.score || 0) >= 10);
      });
      generated = true;
      updateResultMeta(currentSources, data.engine || "真实模型");
      renderSources(currentSources);
      resultStatus.textContent = "已生成";
      setResultButtons();
      setLoading(false);
      toast("话术已生成", "success");
    }).catch(function(){
      var result = buildReply({question: question, points: points, tone: tone, scenario: scenario, hits: hits, fileSnippet: fileSnippet, refs: refs});
      resultText.value = result;
      currentSources = hits;
      generated = true;
      updateResultMeta(hits, "本地模拟");
      renderSources(hits);
      resultStatus.textContent = "已生成（本地模拟）";
      setResultButtons();
      setLoading(false);
      toast("真实模型暂不可用，已用本地模拟", "error");
    });
  }

  
  /* === 折叠面板交互 === */
  $$(".collapsible-header").forEach(function(header){
    header.addEventListener("click", function(){
      var section = header.closest(".collapsible-section");
      if (section) section.classList.toggle("open");
    });
  });

generateBtn.addEventListener("click", generate);
  re
  /* === 折叠面板交互 === */
  $$(".collapsible-header").forEach(function(header){
    header.addEventListener("click", function(){
      var section = header.closest(".collapsible-section");
      if (section) section.classList.toggle("open");
    });
  });

generateBtn.addEventListener("click", generate);
  if (mobileGenerateBtn) mobileGenerateBtn.addEventListener("click", generate);
  if (mobileCopyBtn) mobileCopyBtn.addEventListener("click", function(){ copyBtn.click(); });
  if (mobileSaveBtn) mobileSaveBtn.addEventListener("click", function(){ saveDraftBtn.click(); });

  copyBtn.addEventListener("click", function(){
    var text = resultText.value.trim();
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(function(){ toast("已复制到剪贴板", "success"); }, function(){
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  });

  function fallbackCopy(text){
    resultText.focus();
    resultText.select();
    try{
      document.execCommand("copy");
      toast("已复制到剪贴板", "success");
    }catch(e){
      toast("复制失败，请手动复制", "error");
    }
  }

  function saveDraft(){
    var question = qInput.value.trim();
    var result = resultText.value.trim();
    if (!question && !result){
      toast("没有可保存的内容", "error");
      return;
    }
    var now = Date.now();
    var old = currentDraftId ? drafts.find(function(d){ return d.id === currentDraftId; }) : null;
    var status = "未生成";
    if (result) status = old && old.result !== result ? "已编辑" : "已生成";
    var draft = {
      id: currentDraftId || "d" + now + Math.random().toString(36).slice(2, 7),
      question: question,
      replyPoints: pointsInput.value.trim(),
      references: currentFiles.map(function(f){ return {name: f.name, size: f.size}; }),
      scenario: scenario,
      tone: tone,
      result: result,
      status: status,
      createdAt: old ? old.createdAt : now,
      updatedAt: now
    };
    var idx = drafts.findIndex(function(d){ return d.id === draft.id; });
    if (idx >= 0) drafts[idx] = draft; else drafts.push(draft);
    store(DRAFT_STORE, drafts);
    currentDraftId = draft.id;
    refreshCounts();
    renderDrafts();
    toast("草稿已保存", "success");
  }

  saveDraftBtn.addEventListener("click", saveDraft);

  clearBtn.addEventListener("click", function(){
    if (qInput.value.trim() || pointsInput.value.trim() || resultText.value.trim() || currentFiles.length){
      if (!window.confirm("确定清空当前内容吗？")) return;
    }
    qInput.value = "";
    pointsInput.value = "";
    resultText.value = "";
    currentFiles = [];
    currentSources = [];
    currentDraftId = null;
    generated = false;
    resultStatus.textContent = "等待生成";
    $("#questionCount").textContent = "0 字";
    renderFiles();
    updateResultMeta([]);
    renderSources([]);
    setResultButtons();
  });

  function renderDrafts(){
    drafts.sort(function(a, b){ return b.updatedAt - a.updatedAt; });
    refreshCounts();
    if (!drafts.length){
      draftList.innerHTML = '<div class="draft-empty">暂无草稿</div>';
      return;
    }
    draftList.innerHTML = drafts.map(function(d){
      var cls = d.status === "已生成" ? "saved" : (d.status === "已编辑" ? "edited" : "pending");
      return '<div class="draft-card">' +
        '<div class="draft-q">' + esc(d.question || "（未填写问题）") + '</div>' +
        '<div class="draft-meta">' +
          '<span class="badge ' + cls + '">' + esc(d.status || "未生成") + '</span>' +
          '<span>' + esc(d.scenario || "通用咨询") + ' · ' + esc(d.tone || "正式规范") + '</span>' +
          '<span>' + formatTime(d.updatedAt) + '</span>' +
        '</div>' +
        '<div class="draft-actions">' +
          '<button class="secondary-btn" data-action="open" data-id="' + esc(d.id) + '">打开</button>' +
          '<button class="ghost-btn danger" data-action="delete" data-id="' + esc(d.id) + '">删除</button>' +
        '</div>' +
      '</div>';
    }).join("");
  }

  function setSegmented(groupId, value){
    $$("#" + groupId + " button").forEach(function(b){
      b.classList.toggle("active", b.getAttribute("data-value") === value);
    });
  }

  function openDraft(id){
    var d = drafts.find(function(x){ return x.id === id; });
    if (!d) return;
    qInput.value = d.question || "";
    pointsInput.value = d.replyPoints || "";
    scenario = d.scenario || "通用咨询";
    tone = d.tone || "正式规范";
    setSegmented("scenarioGroup", scenario);
    setSegmented("toneGroup", tone);
    currentFiles = (d.references || []).map(function(r){ return {name: r.name, size: r.size, text: ""}; });
    renderFiles();
    resultText.value = d.result || "";
    currentDraftId = d.id;
    generated = !!d.result;
    currentSources = d.question ? retrieveKnowledge(d.question, 3) : [];
    updateResultMeta(currentSources);
    renderSources(currentSources);
    resultStatus.textContent = generated ? (d.status === "已编辑" ? "已编辑" : "已生成") : "未生成";
    $("#questionCount").textContent = qInput.value.length + " 字";
    setResultButtons();
    closeDrawer("draft");
    toast("草稿已打开", "success");
  }

  function deleteDraft(id){
    if (!window.confirm("确定删除这份草稿吗？")) return;
    drafts = drafts.filter(function(d){ return d.id !== id; });
    store(DRAFT_STORE, drafts);
    if (currentDraftId === id) currentDraftId = null;
    renderDrafts();
    toast("草稿已删除", "success");
  }

  draftList.addEventListener("click", function(e){
    var btn = e.target.closest("button[data-action]");
    if (!btn) return;
    var id = btn.getAttribute("data-id");
    if (btn.getAttribute("data-action") === "open") openDraft(id);
    if (btn.getAttribute("data-action") === "delete") deleteDraft(id);
  });

  function loadServerKB(){
    if (!HAS_API) return Promise.resolve();
    return fetch("/api/kb").then(function(res){
      if (!res.ok) throw new Error("http-" + res.status);
      return res.json();
    }).then(function(data){
      if (data && data.entries) serverKB = data.entries;
      if (data && data.categories) serverKBCategories = data.categories;
    }).catch(function(){
      serverKB = null;
    });
  }

  function callKbApi(action, payload){
    if (!HAS_API) return Promise.reject(new Error("no-api"));
    return fetch("/api/kb", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({action: action, payload: payload || {}})
    }).then(function(res){
      if (!res.ok) throw new Error("http-" + res.status);
      return res.json();
    });
  }

  function applyKbData(data){
    if (data && data.entries) serverKB = data.entries;
    if (data && data.categories) serverKBCategories = data.categories;
    refreshCounts();
    renderKb();
    toast("知识库已更新", "success");
  }

  function kbApiFail(err){
    toast("知识库更新失败：" + ((err && err.message) || err), "error");
  }

  function parseImportText(text){
    var items = [];
    text.split(/\r?\n/).forEach(function(line){
      line = line.trim();
      if (!line) return;
      var parts = line.split(/[|｜]/);
      if (parts.length >= 2){
        items.push({q: parts[0].trim(), a: parts.slice(1).join("｜").trim()});
      } else {
        var idx = line.search(/[:：]/);
        if (idx > 0) items.push({q: line.slice(0, idx).trim(), a: line.slice(idx + 1).trim()});
      }
    });
    return items;
  }

  function kbParentOf(e){
    if (e.parent) return e.parent;
    var cat = e.category || "";
    if (cat.indexOf("百问百答-") === 0) return "百问百答";
    return "内置知识";
  }

  function kbSubOf(e){
    if (e.sub) return e.sub;
    var cat = e.category || "";
    if (cat.indexOf("百问百答-") === 0) return cat.slice(5);
    return cat || "未分类";
  }

  function renderKb(){
    var keyword = kbSearch.value.trim();
    var list = allKb().filter(function(k){
      if (!keyword) return true;
      var text = (k.q || "") + (k.a || "") + (k.category || "") + (k.parent || "") + (k.sub || "");
      return text.indexOf(keyword) >= 0;
    });
    kbTotal.textContent = list.length + " 条";
    if (kbManageBtn) kbManageBtn.style.display = serverKB ? "" : "none";

    if (!serverKB){
      var groups = {};
      list.forEach(function(k){ var cat = k.category || "未分类"; (groups[cat] = groups[cat] || []).push(k); });
      var html = Object.keys(groups).map(function(cat){
        return '<div class="kb-group">' +
          '<div class="kb-group-title">' + esc(cat) + ' · ' + groups[cat].length + '</div>' +
          groups[cat].map(function(k){
            var delBtn = "";
            var impIdx = importedKB.indexOf(k);
            if (impIdx >= 0){
              delBtn = '<button type="button" class="kb-del" data-imp-idx="' + impIdx + '">删除</button>';
            }
            return '<div class="kb-item">' + delBtn + '<div class="q">' + esc(k.q) + '</div><div class="a">' + esc(k.a) + '</div></div>';
          }).join("") +
        '</div>';
      }).join("");
      kbList.innerHTML = html || '<div class="draft-empty">没有匹配的知识条目</div>';
      return;
    }

    var tree = {};
    list.forEach(function(e){
      var p = kbParentOf(e);
      var sub = kbSubOf(e);
      if (!tree[p]) tree[p] = {};
      if (!tree[p][sub]) tree[p][sub] = [];
      tree[p][sub].push(e);
    });
    serverKBCategories.forEach(function(c){
      if (c.parent && c.sub){
        if (!tree[c.parent]) tree[c.parent] = {};
        if (!tree[c.parent][c.sub]) tree[c.parent][c.sub] = [];
      }
    });
    var treeHtml = Object.keys(tree).sort().map(function(parent){
      var subs = Object.keys(tree[parent]).sort();
      var subsHtml = subs.map(function(sub){
        var entries = tree[parent][sub];
        var key = parent + "|" + sub;
        var expanded = !!kbExpanded[key];
        var addEntryBtn = kbManageMode
          ? '<button type="button" class="kb-manage-btn" data-add-entry-parent="' + esc(parent) + '" data-add-entry-sub="' + esc(sub) + '">+ 新增知识</button>'
          : "";
        return '<div class="kb-sub">' +
          '<div class="kb-sub-title" data-toggle-sub="' + esc(key) + '">' +
            '<span class="kb-arrow">' + (expanded ? "▾" : "▸") + '</span>' + esc(sub) + ' · ' + entries.length + addEntryBtn +
          '</div>' +
          '<div class="kb-sub-body"' + (expanded ? "" : ' style="display:none"') + '>' +
          entries.map(function(e){
            var isExternal = e.parent === "外置" || e.source === "自定义";
            var actions = (kbManageMode || isExternal)
              ? '<div class="kb-item-actions">' +
                  (kbManageMode ? '<button type="button" data-edit-id="' + esc(e.id) + '">编辑</button>' : "") +
                  (kbManageMode ? '<button type="button" data-move-id="' + esc(e.id) + '">移动</button>' : "") +
                  '<button type="button" data-del-id="' + esc(e.id) + '">删除</button>' +
                '</div>'
              : "";
            return '<div class="kb-item">' + actions + '<div class="q">' + esc(e.q) + '</div><div class="a">' + esc(e.a) + '</div></div>';
          }).join("") +
        '</div>' +
        '</div>';
      }).join("");
      var addSubBtn = kbManageMode
        ? '<button type="button" class="kb-manage-btn" data-add-sub="' + esc(parent) + '">+ 新增子类</button>'
        : "";
      return '<div class="kb-parent">' +
        '<div class="kb-parent-title">' + esc(parent) + ' · ' + subs.length + ' 个子类' + addSubBtn + '</div>' +
        subsHtml +
      '</div>';
    }).join("");
    kbList.innerHTML = treeHtml || '<div class="draft-empty">没有匹配的知识条目</div>';
  }

  kbSearch.addEventListener("input", renderKb);

  var kbManageBtn = $("#kbManageBtn");
  if (kbManageBtn){
    kbManageBtn.addEventListener("click", function(){
      kbManageMode = !kbManageMode;
      kbManageBtn.textContent = kbManageMode ? "完成管理" : "管理模式";
      kbManageBtn.classList.toggle("active", kbManageMode);
      renderKb();
    });
  }

  kbList.addEventListener("click", function(e){
    var toggle = e.target.closest("[data-toggle-sub]");
    if (toggle){
      if (e.target.closest("button")) return;
      var key = toggle.getAttribute("data-toggle-sub");
      kbExpanded[key] = !kbExpanded[key];
      renderKb();
      return;
    }
    var btn = e.target.closest("button[data-imp-idx]");
    if (btn){
      var idx = Number(btn.getAttribute("data-imp-idx"));
      if (idx >= 0 && idx < importedKB.length){
        if (!window.confirm("确定删除这条导入知识吗？")) return;
        importedKB.splice(idx, 1);
        store(KB_STORE, importedKB);
        renderKb();
        refreshCounts();
        toast("导入知识已删除", "success");
      }
      return;
    }
    if (!serverKB) return;

    var addSub = e.target.closest("button[data-add-sub]");
    if (addSub){
      var parent = addSub.getAttribute("data-add-sub");
      var sub = window.prompt("输入新子类名称");
      if (!sub) return;
      callKbApi("addCategory", {parent: parent, sub: sub}).then(applyKbData).catch(kbApiFail);
      return;
    }

    var addEntry = e.target.closest("button[data-add-entry-parent]");
    if (addEntry){
      var q = window.prompt("输入问题");
      if (!q) return;
      var a = window.prompt("输入答案");
      if (!a) return;
      callKbApi("add", {
        parent: addEntry.getAttribute("data-add-entry-parent"),
        sub: addEntry.getAttribute("data-add-entry-sub"),
        q: q,
        a: a
      }).then(applyKbData).catch(kbApiFail);
      return;
    }

    var editBtn = e.target.closest("button[data-edit-id]");
    if (editBtn){
      var id = editBtn.getAttribute("data-edit-id");
      var entry = serverKB.find(function(x){ return x.id === id; });
      if (!entry) return;
      var nq = window.prompt("编辑问题", entry.q);
      if (!nq) return;
      var na = window.prompt("编辑答案", entry.a);
      if (!na) return;
      callKbApi("edit", {id: id, q: nq, a: na}).then(applyKbData).catch(kbApiFail);
      return;
    }

    var moveBtn = e.target.closest("button[data-move-id]");
    if (moveBtn){
      var id2 = moveBtn.getAttribute("data-move-id");
      var entry2 = serverKB.find(function(x){ return x.id === id2; });
      if (!entry2) return;
      var target = window.prompt("目标位置，格式：大类/子类", entry2.parent + "/" + entry2.sub);
      if (!target) return;
      var parts = target.split("/");
      if (parts.length < 2 || !parts[0].trim() || !parts[1].trim()){
        toast("格式应为：大类/子类", "error");
        return;
      }
      callKbApi("move", {id: id2, parent: parts[0].trim(), sub: parts[1].trim()}).then(applyKbData).catch(kbApiFail);
      return;
    }

    var delBtn = e.target.closest("button[data-del-id]");
    if (delBtn){
      var id3 = delBtn.getAttribute("data-del-id");
      if (!window.confirm("确定删除这条知识吗？")) return;
      callKbApi("delete", {id: id3}).then(applyKbData).catch(kbApiFail);
    }
  });

  $("#kbImportBtn").addEventListener("click", function(){
    var text = kbImportText.value.trim();
    if (!text){ toast("请输入要导入的知识文本", "error"); return; }
    var items = parseImportText(text);
    if (!items.length){ toast("格式暂不支持，请使用“问题｜口径”", "error"); return; }
    if (HAS_API){
      Promise.all(items.map(function(it){
        return callKbApi("add", {parent: "外置", sub: "导入", q: it.q, a: it.a});
      })).then(function(){
        kbImportText.value = "";
        return loadServerKB();
      }).then(function(){
        renderKb();
        refreshCounts();
        toast("已导入 " + items.length + " 条知识", "success");
      }).catch(function(){
        toast("导入失败", "error");
      });
      return;
    }
    importedKB = importedKB.concat(items);
    store(KB_STORE, importedKB);
    kbImportText.value = "";
    renderKb();
    refreshCounts();
    toast("已导入 " + items.length + " 条知识", "success");
  });

  $("#kbClearBtn").addEventListener("click", function(){
    if (serverKB){
      var targets = serverKB.filter(function(e){ return e.source === "自定义" || e.parent === "外置" || e.parent === "导入知识"; });
      if (!targets.length){ toast("当前没有可清空的导入知识", "error"); return; }
      if (!window.confirm("确定清空导入的知识吗？")) return;
      Promise.all(targets.map(function(e){ return callKbApi("delete", {id: e.id}); })).then(function(){
        return loadServerKB();
      }).then(function(){
        renderKb();
        refreshCounts();
        toast("导入知识已清空", "success");
      }).catch(function(){
        toast("清空失败", "error");
      });
      return;
    }
    if (!importedKB.length){ toast("当前没有导入知识", "error"); return; }
    if (!window.confirm("确定清空导入的知识吗？")) return;
    importedKB = [];
    store(KB_STORE, importedKB);
    renderKb();
    refreshCounts();
    toast("导入知识已清空", "success");
  });

function openDrawer(name){
    $("#" + name + "Drawer").classList.add("open");
    $("#" + name + "Drawer").setAttribute("aria-hidden", "false");
  }
  function closeDrawer(name){
    $("#" + name + "Drawer").classList.remove("open");
    $("#" + name + "Drawer").setAttribute("aria-hidden", "true");
  }

  $("#kbBtn").addEventListener("click", function(){ renderKb(); openDrawer("kb"); });
  $("#draftBtn").addEventListener("click", function(){ renderDrafts(); openDrawer("draft"); });
  $$("[data-close]").forEach(function(el){
    el.addEventListener("click", function(){ closeDrawer(el.getAttribute("data-close")); });
  });
  document.addEventListener("keydown", function(e){
    if (e.key === "Escape"){ closeDrawer("kb"); closeDrawer("draft"); }
  });

  renderFiles();
  renderDrafts();
  updateResultMeta([]);
  renderSources([]);
  setResultButtons();
  refreshCounts();
  loadServerKB().then(function(){
    renderKb();
    refreshCounts();
  });
})();
